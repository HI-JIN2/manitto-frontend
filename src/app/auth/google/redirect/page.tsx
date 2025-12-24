"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";

function GoogleRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>("처리 중...");

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const error = searchParams.get("error");

    if (error) {
      setStatus(`로그인 오류: ${error}`);
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
      return;
    }

    if (!accessToken) {
      setStatus("Access token을 받지 못했습니다.");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
      return;
    }

    // 백엔드에 access_token 전달하여 JWT 받기
    const verifyToken = async () => {
      try {
        const res = await apiFetch<{ token: string; error?: string }>(
          `/api/auth/google/verify?access_token=${encodeURIComponent(accessToken)}`,
          {
            method: "GET",
          }
        );

        if (res.error) {
          setStatus(`오류: ${res.error}`);
          setTimeout(() => {
            router.push("/auth");
          }, 2000);
          return;
        }

        if (!res.token) {
          setStatus("JWT 토큰을 받지 못했습니다.");
          setTimeout(() => {
            router.push("/auth");
          }, 2000);
          return;
        }

        setToken(res.token);
        setStatus("로그인 성공! 홈으로 이동합니다...");
        setTimeout(() => {
          router.push("/");
        }, 800);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setStatus(`오류: ${err.message}`);
        } else {
          setStatus("로그인 처리 중 오류가 발생했습니다.");
        }
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
        <p className="text-lg font-semibold">{status}</p>
      </div>
    </main>
  );
}

export default function GoogleRedirectPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 py-12">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="text-lg font-semibold">처리 중...</p>
        </div>
      </main>
    }>
      <GoogleRedirectContent />
    </Suspense>
  );
}

