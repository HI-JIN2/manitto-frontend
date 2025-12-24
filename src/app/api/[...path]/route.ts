import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "POST");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "DELETE");
}

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string,
) {
  const path = pathSegments.join("/");
  const url = new URL(`${BACKEND_URL}/${path}`);
  
  // 쿼리 파라미터 복사
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  const headers = new Headers();
  
  // Authorization 헤더 복사
  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    headers.set("Authorization", authHeader);
  }
  
  headers.set("Content-Type", "application/json");

  let body: string | undefined;
  if (method !== "GET" && method !== "DELETE") {
    try {
      body = await request.text();
    } catch {
      // body가 없으면 무시
    }
  }

  try {
    const res = await fetch(url.toString(), {
      method,
      headers,
      body,
    });

    const text = await res.text();
    const response = new NextResponse(text, {
      status: res.status,
      statusText: res.statusText,
    });

    // CORS 헤더 복사
    res.headers.forEach((value, key) => {
      if (key.toLowerCase().startsWith("access-control-")) {
        response.headers.set(key, value);
      }
    });

    return response;
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "백엔드 서버에 연결할 수 없습니다." },
      { status: 502 },
    );
  }
}

