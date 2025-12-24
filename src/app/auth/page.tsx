"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { ErrorDialog } from "@/components/ErrorDialog";

export default function AuthPage() {
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const router = useRouter();

  // 디버깅: Google Client ID 및 Origin 확인
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (typeof window !== "undefined") {
    if (!googleClientId) {
      console.warn("⚠️ NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set!");
    } else {
      console.log("✅ Google Client ID loaded:", googleClientId?.substring(0, 20) + "...");
    }
    console.log("📍 Current Origin:", window.location.origin);
    console.log("📍 Current URL:", window.location.href);
    console.log("⚠️ 이 origin을 Google Cloud Console의 '승인된 JavaScript 원본'에 추가해야 합니다!");
  }

  // 현재 origin 기반 redirect_uri 생성
  const redirectUri = typeof window !== "undefined" 
    ? `${window.location.origin}/auth` 
    : "";

  const handleGoogleSuccess = async (credential?: string | null) => {
    if (!credential) {
      setDialogMessage("Google 로그인에 실패했습니다. 다시 시도해 주세요.");
      return;
    }
    try {
      const res = await apiFetch<{ token: string; error?: string }>("/api/auth/google", {
        method: "POST",
        body: { 
          credential,
          redirectUri: redirectUri || (typeof window !== "undefined" ? window.location.origin : ""),
        },
      });
      
      if (res.error) {
        setDialogMessage(res.error);
        return;
      }
      
      if (!res.token) {
        setDialogMessage("로그인 토큰을 받지 못했습니다. 다시 시도해 주세요.");
        return;
      }
      
      setToken(res.token);
      setDialogMessage("로그인에 성공했어요. 이제 마니또 파티를 시작해 보세요!");
      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDialogMessage(err.message);
      } else {
        setDialogMessage("로그인 처리 중 오류가 발생했습니다.");
      }
    }
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
        {googleClientId ? (
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={(res) => handleGoogleSuccess(res.credential)}
              onError={() =>
                setDialogMessage("Google 로그인에 실패했습니다. 다시 시도해 주세요.")
              }
              shape="pill"
              size="large"
              width="260"
            />
          </GoogleOAuthProvider>
        ) : (
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
            <p className="font-semibold">⚠️ Google Client ID가 설정되지 않았습니다.</p>
            <p className="mt-1 text-xs">
              환경변수 <code className="font-mono">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>를 설정해주세요.
            </p>
          </div>
        )}
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

