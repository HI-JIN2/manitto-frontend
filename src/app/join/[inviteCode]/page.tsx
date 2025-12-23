"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { ErrorDialog } from "@/components/ErrorDialog";

export default function JoinByInviteCodePage() {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await apiFetch(`/parties/invite/${inviteCode}/guest/join`, {
        method: "POST",
        body: { name, email },
      });
      setStatus("참여 완료 🎈");
      setName("");
      setEmail("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDialogMessage(err.message);
      } else {
        setDialogMessage("참여에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">초대코드로 파티 참여</h1>
        <p className="text-sm text-muted">
          초대 링크로 들어왔다면 코드가 자동 채워집니다. 이름/이메일을 입력하면
          게스트로 참여합니다.
        </p>
      </header>

      <form
        onSubmit={handleJoin}
        className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20"
      >
        <div className="space-y-2">
          <label className="text-sm text-muted">이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
            placeholder="이름"
          />
        </div>
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

      <ErrorDialog
        open={dialogMessage !== null}
        message={dialogMessage ?? ""}
        onClose={() => setDialogMessage(null)}
      />
    </main>
  );
}


