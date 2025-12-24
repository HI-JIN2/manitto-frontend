import { NextRequest, NextResponse } from "next/server";

// 서버 사이드에서만 사용할 환경변수 (NEXT_PUBLIC_ 없이)
const BACKEND_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

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
  
  // BACKEND_URL 구성
  // NEXT_PUBLIC_API_BASE_URL이 이미 /api를 포함할 수 있음
  let backendBase = BACKEND_URL;
  if (!backendBase.endsWith("/api") && !backendBase.endsWith("/api/")) {
    backendBase = backendBase.endsWith("/") 
      ? `${backendBase}api` 
      : `${backendBase}/api`;
  }
  
  // 경로가 /로 시작하면 제거
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(`${backendBase}/${cleanPath}`);
  
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
    console.log(`[Proxy] ${method} ${url.toString()}`);
    
    // AbortController로 타임아웃 설정 (10초)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const res = await fetch(url.toString(), {
      method,
      headers,
      body,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const text = await res.text();
    const response = new NextResponse(text, {
      status: res.status,
      statusText: res.statusText,
    });

    // Content-Type 헤더 복사
    const contentType = res.headers.get("Content-Type");
    if (contentType) {
      response.headers.set("Content-Type", contentType);
    }

    // CORS 헤더 복사
    res.headers.forEach((value, key) => {
      if (key.toLowerCase().startsWith("access-control-")) {
        response.headers.set(key, value);
      }
    });

    return response;
  } catch (error) {
    console.error("[Proxy] Error:", error);
    console.error("[Proxy] Backend URL:", BACKEND_URL);
    console.error("[Proxy] Path:", path);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isConnectionError = errorMessage.includes("ECONNREFUSED") || errorMessage.includes("fetch failed");
    
    return NextResponse.json(
      { 
        error: isConnectionError 
          ? "백엔드 서버에 연결할 수 없습니다. NCP ACG 설정을 확인해주세요." 
          : `백엔드 서버 오류: ${errorMessage}`,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 502 },
    );
  }
}

