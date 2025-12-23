"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function JoinPartyPage() {
  const { partyId } = useParams<{ partyId: string }>();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await apiFetch(`/parties/${partyId}/join`, {
        method: "POST",
        body: { email },
      });
      setStatus("참여 완료 🎈");
      setEmail("");
    } catch (err: any) {
      setStatus(err.message ?? "참여 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm text-muted">/join/{partyId}</p>
        <h1 className="text-2xl font-semibold">파티 참여</h1>
        <p className="text-sm text-muted">
          파티 ID는 URL로 전달됩니다. 이메일을 입력 후 참여하세요.
        </p>
      </header>

      <form
        onSubmit={handleJoin}
        className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6"
      >
        <div className="space-y-2">
          <label className="text-sm text-muted">이메일</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
            placeholder="example@email.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "참여 중..." : "파티 참여"}
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

