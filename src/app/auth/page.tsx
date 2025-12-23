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

  const handleGoogleSuccess = async (credential?: string | null) => {
    if (!credential) {
      setDialogMessage("Google 로그인에 실패했습니다. 다시 시도해 주세요.");
      return;
    }
    try {
      const res = await apiFetch<{ token: string }>("/auth/google", {
        method: "POST",
        body: { credential },
      });
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
        <GoogleOAuthProvider
          clientId={
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
            "set-NEXT_PUBLIC_GOOGLE_CLIENT_ID"
          }
        >
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

