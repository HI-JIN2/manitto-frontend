"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function CreatePartyPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await apiFetch<{ id: string }>("/parties", {
        method: "POST",
        body: { name, password },
      });
      setStatus(`파티 생성 완료! ID: ${res.id}`);
      setName("");
      setPassword("");
    } catch (err: any) {
      setStatus(err.message ?? "생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm text-muted">/create</p>
        <h1 className="text-2xl font-semibold">마니또 파티 만들기</h1>
        <p className="text-sm text-muted">
          API 베이스 URL과 토큰을 먼저 설정하세요. (홈 화면에서 토큰 입력)
        </p>
      </header>

      <form
        onSubmit={handleCreate}
        className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6"
      >
        <div className="space-y-2">
          <label className="text-sm text-muted">파티 이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
            placeholder="예) 팀 연말 이벤트"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted">비밀번호</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
            placeholder="접근 비밀번호"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "생성 중..." : "파티 생성"}
        </button>
      </form>

      {status && (
        <div className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm text-muted">
          {status}
        </div>
      )}
    </main>
  );
}

