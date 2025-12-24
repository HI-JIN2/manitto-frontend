"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { ErrorDialog } from "@/components/ErrorDialog";

type Participant = {
  id: number;
  email: string;
  displayName: string;
};

export default function PartyStatusPage() {
  const { partyId } = useParams<{ partyId: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMatched, setIsMatched] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [matching, setMatching] = useState(false);

  const loadData = async () => {
    try {
      // 파티 정보 가져오기 (초대 코드 포함)
      const party = await apiFetch<{ inviteCode: string }>(
        `/parties/${partyId}`,
      );
      setInviteCode(party.inviteCode);

      const people = await apiFetch<Participant[]>(
        `/parties/${partyId}/participants`,
      );
      setParticipants(people);

      const status = await apiFetch<{ matched: boolean }>(
        `/parties/${partyId}/status`,
      );
      setIsMatched(status.matched);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDialogMessage(err.message);
      } else {
        setDialogMessage("파티 정보를 불러올 수 없습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partyId]);

  const handleMatch = async () => {
    if (matching) return;
    setMessage(null);
    try {
      setMatching(true);
      await apiFetch(`/parties/${partyId}/match`, { method: "POST" });
      setMessage("페니가 마니또를 정해두었어요. 이메일을 확인해 보세요.");
      setIsMatched(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDialogMessage(err.message);
      } else {
        setDialogMessage("매칭에 실패했습니다.");
      }
    } finally {
      setMatching(false);
    }
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    try {
      await apiFetch(`/parties/${partyId}/guest/join`, {
        method: "POST",
        body: {
          name: newName,
          email: newEmail,
        },
      });
      setNewName("");
      setNewEmail("");
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDialogMessage(err.message);
      } else {
        setDialogMessage("참가자 추가에 실패했습니다.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setMessage(null);
    setDeletingId(id);
    try {
      await apiFetch(`/parties/${partyId}/participants/${id}`, {
        method: "DELETE",
      });
      setParticipants((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDialogMessage(err.message);
      } else {
        setDialogMessage("참가자 삭제에 실패했습니다.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const inviteLink = typeof window !== "undefined" && inviteCode
    ? `${window.location.origin}/join/${inviteCode}`
    : "";

  const handleCopyLink = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1200);
    } catch {
      setLinkCopied(false);
    }
  };

  const handleCopyMessage = async () => {
    const message = `🎁 마니또 파티에 초대해요!

아래 링크를 눌러서  
회원가입 없이 바로 마니또 파티에 참여할 수 있어요.

👉 ${inviteLink}

이름과 이메일만 입력하면 끝이에요.  
부담 없이 들어와서 같이 파티 즐겨주세요 🙂

— 페니 🐧`;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
        <p className="text-muted">불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">파티 상태</h1>
        <p className="text-sm text-muted">
          참여자 목록을 확인하고 매칭을 실행하세요. 페니가 조용히 도와줄 거예요.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold">참여자</h2>
          <p className="text-xs text-muted">
            현재{" "}
            <span className="font-semibold text-foreground">
              {participants.length}
            </span>
            명이 참여 중입니다.
          </p>
        </div>
        {participants.length === 0 ? (
          <p className="text-sm text-muted">아직 참가자가 없습니다.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {participants.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-surface-2 px-3 py-2 text-muted"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{p.displayName}</span>
                  <span className="text-xs text-muted">{p.email}</span>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition hover:border-red-400 hover:text-red-300 disabled:opacity-60"
                >
                  {deletingId === p.id ? "삭제 중..." : "삭제"}
                </button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddGuest} className="mt-4 space-y-3 border-t border-white/10 pt-4">
          <p className="text-sm font-semibold text-foreground">참여자 추가</p>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              className="rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
              placeholder="이름"
            />
            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              type="email"
              className="rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
              placeholder="email@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {saving ? "추가 중..." : "참여자 추가"}
          </button>
        </form>
      </section>

      {inviteCode && (
        <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
          <h2 className="text-lg font-semibold">초대 링크</h2>
          <div className="space-y-2 text-sm">
            <div className="space-y-1">
              <p className="text-muted">초대코드</p>
              <p className="font-mono text-foreground">{inviteCode}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted">초대 링크</p>
              <div className="flex items-center gap-0">
                <p className="flex-1 truncate font-mono text-foreground text-xs pr-0">
                  {inviteLink || "로딩 중..."}
                </p>
                <button
                  onClick={handleCopyLink}
                  className="flex-shrink-0 rounded p-1 text-muted transition hover:bg-surface-2 hover:text-foreground -ml-1"
                  title="링크만 복사"
                >
                  {linkCopied ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted">
                링크를 복사해서 단톡방에 툭 보내주세요.
              </p>
              <button
                onClick={handleCopyMessage}
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {copied ? "복사됨 ✓" : "복사하기"}
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <h2 className="text-lg font-semibold">매칭 상태</h2>
        {isMatched ? (
          <div className="space-y-2">
            <p className="text-sm text-green-300">🎁 페니가 마니또를 정해두었어요.</p>
            <p className="text-xs text-muted">이메일로 매칭 결과가 발송되었을 거예요.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              모든 파티원이 추가되었다면, 이제 매칭을 시작해 보세요. 페니가 조용히 지켜보고 있어요.
            </p>
            <button
              onClick={handleMatch}
              disabled={matching}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {matching ? "매칭 중..." : "매칭 시작"}
            </button>
          </div>
        )}
        {message && (
          <p className="text-sm text-muted">
            {message}
          </p>
        )}
      </section>

      <ErrorDialog
        open={dialogMessage !== null}
        message={dialogMessage ?? ""}
        onClose={() => setDialogMessage(null)}
      />
    </main>
  );
}

