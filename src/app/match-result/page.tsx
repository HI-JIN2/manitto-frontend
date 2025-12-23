"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type MatchResponse = { receiver: string };

export default function MatchResultPage() {
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResult = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await apiFetch<MatchResponse>("/parties/match/result");
      setResult(res.receiver);
    } catch (err: any) {
      setStatus(err.message ?? "결과 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm text-muted">/match-result</p>
        <h1 className="text-2xl font-semibold">내 마니또</h1>
        <p className="text-sm text-muted">
          매칭 완료 후 결과를 조회합니다. 토큰을 먼저 설정하세요.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6">
        <button
          onClick={fetchResult}
          disabled={loading}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "불러오는 중..." : "결과 보기"}
        </button>

        {result && (
          <div className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-base font-semibold">
            🎁 당신의 마니또: {result}
          </div>
        )}

        {status && (
          <p className="text-sm text-muted">
            {status}
          </p>
        )}
      </section>
    </main>
  );
}

