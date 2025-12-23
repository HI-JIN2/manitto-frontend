"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { setToken, getToken, clearToken } from "@/lib/auth";

const links = [
  { href: "/create", label: "파티 생성" },
  { href: "/join/demo-party-id", label: "파티 참여 (예시 ID)" },
  { href: "/party/demo-party-id", label: "파티 상태 / 매칭" },
  { href: "/match-result", label: "매칭 결과" },
];

export default function Home() {
  const [tokenInput, setTokenInput] = useState("");
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  useEffect(() => {
    setCurrentToken(getToken());
  }, []);

  const handleSave = () => {
    setToken(tokenInput.trim());
    setCurrentToken(tokenInput.trim());
    setTokenInput("");
  };

  const handleClear = () => {
    clearToken();
    setCurrentToken(null);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-16">
      <section className="rounded-3xl border border-white/10 bg-surface px-8 py-10 shadow-2xl shadow-black/40">
        <p className="text-sm text-muted">마니또 / Next.js</p>
        <h1 className="mt-2 text-3xl font-semibold leading-9">
          빠른 마이그레이션용 스켈레톤
        </h1>
        <p className="mt-4 max-w-3xl text-muted">
          백엔드 베이스 URL, 인증 토큰은 환경변수/토큰 입력으로 주입하세요.
          하단 링크는 주요 플로우로 이어집니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              className="rounded-full border border-white/10 bg-surface-2 px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-surface px-6 py-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted">현재 토큰</p>
              <p className="mt-1 text-sm font-mono text-foreground">
                {currentToken ? `${currentToken.slice(0, 20)}...` : "없음"}
              </p>
            </div>
            <button
              onClick={handleClear}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
            >
              토큰 초기화
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted">토큰 붙여넣기</label>
            <textarea
              className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
              rows={2}
              placeholder="JWT 또는 API 토큰을 입력"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="w-fit rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              토큰 저장
            </button>
          </div>
          <p className="text-xs text-muted">
            토큰은 로컬스토리지에만 저장됩니다. 인증/로그인은 추후 NextAuth 또는
            OAuth 버튼으로 교체하세요.
          </p>
        </div>
      </section>
    </main>
  );
}
