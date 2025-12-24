"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { ErrorDialog } from "@/components/ErrorDialog";

function AuthContent() {
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터에서 에러 확인
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setDialogMessage(`로그인 오류: ${error}`);
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      setDialogMessage("API 서버 URL이 설정되지 않았습니다.");
      return;
    }

    // 백엔드로 리다이렉트 (프론트엔드 리다이렉트 URI 전달)
    const frontendRedirectUri = typeof window !== "undefined"
      ? `${window.location.origin}/auth/google/redirect`
      : "";
    
    const backendAuthUrl = `${baseUrl}/api/auth/google?redirect_uri=${encodeURIComponent(frontendRedirectUri)}`;
    
    // 백엔드로 리다이렉트
    window.location.href = backendAuthUrl;
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">로그인</h1>
        <p className="text-sm text-muted">
          기본은 게스트 모드입니다. 필요하다면 Google 계정으로 로그인해, 참여
          이력을 계정에 연결할 수 있어요.
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <h2 className="text-lg font-semibold">Google 로그인</h2>
        <p className="text-sm text-muted">
          이 이메일 주소로 참여한 마니또 파티를 한 번에 관리하고 싶다면 Google
          로그인으로 계정을 만들어 두세요.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google 계정으로 로그인
        </button>
        <p className="text-xs text-muted">
          로그인은 선택 사항입니다. 로그인하지 않아도 게스트 모드로 파티 생성과 참여가
          모두 가능합니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <h2 className="text-lg font-semibold">게스트 모드 안내</h2>
        <p className="text-sm text-muted">
          로그인 없이도 파티 생성과 참여가 가능합니다. 계정은 참여 이력을 모아 보고
          싶을 때만 선택적으로 사용하면 됩니다.
        </p>
      </section>

      <ErrorDialog
        open={dialogMessage !== null}
        message={dialogMessage ?? ""}
        onClose={() => setDialogMessage(null)}
      />
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">로그인</h1>
          <p className="text-sm text-muted">로딩 중...</p>
        </header>
      </main>
    }>
      <AuthContent />
    </Suspense>
  );
}

