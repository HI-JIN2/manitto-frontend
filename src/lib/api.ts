import { getToken } from "@/lib/auth";

type HttpMethod = "GET" | "POST" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: Record<string, unknown> | undefined;
  headers?: Record<string, string>;
};

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, headers }: RequestOptions = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  const token = getToken();

  // HTTPS 페이지에서 HTTP 백엔드 요청 시 프록시 사용 (Mixed Content 방지)
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
  const isHttpBackend = baseUrl.startsWith("http://");
  const useProxy = isHttps && isHttpBackend;
  
  const apiUrl = useProxy ? `/api${path}` : `${baseUrl}${path}`;

  const res = await fetch(apiUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    let friendly = "요청을 처리하는 중 오류가 발생했습니다.";

    if (text) {
      try {
        const data = JSON.parse(text) as any;
        if (data && typeof data.error === "string") {
          friendly = data.error;
        } else {
          friendly = text;
        }
      } catch {
        friendly = text;
      }
    }

    throw new Error(friendly);
  }

  if (!text) {
    // No content (e.g., 204)
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    // Non-JSON body
    return undefined as T;
  }
}

