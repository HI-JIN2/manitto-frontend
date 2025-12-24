import { NextRequest, NextResponse } from "next/server";

// 서버 사이드에서만 사용할 환경변수
const BACKEND_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export async function GET(request: NextRequest) {
  try {
    // 프론트엔드 리다이렉트 URI 가져오기
    const redirectUri = request.nextUrl.searchParams.get("redirect_uri");
    
    // 백엔드 base URL 정규화
    let backendBase = BACKEND_URL;
    if (!backendBase.endsWith("/api") && !backendBase.endsWith("/api/")) {
      backendBase = backendBase.endsWith("/") 
        ? `${backendBase}api` 
        : `${backendBase}/api`;
    }
    
    // 백엔드 base URL에서 /api 제거하여 실제 서버 URL 얻기
    const backendServerUrl = backendBase.replace(/\/api\/?$/, "");
    
    // 백엔드 Google OAuth 엔드포인트 URL 구성
    const backendAuthUrl = `${backendServerUrl}/api/auth/google${redirectUri ? `?redirect_uri=${encodeURIComponent(redirectUri)}` : ""}`;
    
    console.log("[Auth Proxy] Backend URL:", backendAuthUrl);
    
    // 백엔드로 리다이렉트 (서버 사이드에서 실행되므로 Mixed Content 문제 없음)
    return NextResponse.redirect(backendAuthUrl);
  } catch (error) {
    console.error("[Auth Proxy] Error:", error);
    return NextResponse.json(
      { error: "인증 서버에 연결할 수 없습니다." },
      { status: 502 }
    );
  }
}

