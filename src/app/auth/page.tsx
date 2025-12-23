"use client";

import { useState } from "react";
import { setToken, clearToken, getToken } from "@/lib/auth";

export default function AuthPage() {
  const [input, setInput] = useState("");
  const [current] = useState<string | null>(() => getToken());
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setToken(input.trim());
    setInput("");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm text-muted">/auth</p>
        <h1 className="text-3xl font-semibold">로그인 / 토큰 설정</h1>
        <p className="text-sm text-muted">
          기본은 게스트 모드입니다. 토큰을 보유한 경우 붙여넣어 사용할 수 있고,
          추후 OAuth 버튼을 여기에 추가할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted">현재 저장된 토큰</p>
            <p className="mt-1 text-sm font-mono text-foreground">
              {current ? `${current.slice(0, 28)}...` : "없음"}
            </p>
          </div>
          <button
            onClick={() => {
              clearToken();
              window.location.reload();
            }}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
          >
            초기화
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted">토큰 붙여넣기</label>
          <textarea
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
            rows={2}
            placeholder="백엔드에서 발급받은 JWT"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              토큰 저장
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(input).then(() => setCopied(true));
                setTimeout(() => setCopied(false), 1200);
              }}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent"
            >
              {copied ? "복사됨" : "클립보드"}
            </button>
          </div>
          <p className="text-xs text-muted">
            토큰은 로컬스토리지에 저장됩니다. OAuth(예: Google) 로그인 버튼은 이
            페이지에 추가하면 됩니다.
          </p>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <h2 className="text-lg font-semibold">게스트 모드 안내</h2>
        <p className="text-sm text-muted">
          로그인 없이 파티 생성/참여가 가능합니다. 필요한 경우에만 토큰을 설정하세요.
        </p>
      </section>
    </main>
  );
}

