"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PartyStatusByCodeEntryPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    router.push(`/party/invite/${trimmed}`);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">초대코드로 파티 상태 보기</h1>
        <p className="text-sm text-muted">
          받은 초대코드를 입력하면 해당 파티의 상태 페이지로 이동해요. 페니가 기다리고 있어요.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20"
      >
        <div className="space-y-2">
          <label className="text-sm text-muted">초대코드</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm uppercase outline-none transition focus:border-accent"
            placeholder="예: ABC123"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          파티 상태 페이지로 이동
        </button>
      </form>
    </main>
  );
}


