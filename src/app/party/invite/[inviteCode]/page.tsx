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

type PartyDetail = {
  id: number;
  name: string;
};

export default function PartyStatusByInvitePage() {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const [partyId, setPartyId] = useState<number | null>(null);
  const [partyName, setPartyName] = useState<string>("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMatched, setIsMatched] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [matching, setMatching] = useState(false);

  const loadData = async (resolvedPartyId?: number) => {
    try {
      const currentPartyId = resolvedPartyId ?? partyId;
      if (!currentPartyId) return;

      const people = await apiFetch<Participant[]>(
        `/parties/${currentPartyId}/participants`,
      );
      setParticipants(people);

      const status = await apiFetch<{ matched: boolean }>(
        `/parties/${currentPartyId}/status`,
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
    const load = async () => {
      try {
        const party = await apiFetch<PartyDetail & { isMatched: boolean }>(
          `/parties/invite/${inviteCode}`,
        );
        setPartyId(party.id);
        setPartyName(party.name);
        setIsMatched(party.isMatched);
        await loadData(party.id);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setDialogMessage(err.message);
        } else {
          setDialogMessage("파티 정보를 불러올 수 없습니다.");
        }
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteCode]);

  const handleMatch = async () => {
    if (!partyId) return;
    if (matching) return;
    setMessage(null);
    try {
      setMatching(true);
      await apiFetch(`/parties/${partyId}/match`, { method: "POST" });
      setMessage("매칭 완료! 이메일이 발송되었을 수 있습니다.");
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
    if (!partyId) return;
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
      await loadData(partyId);
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
    if (!partyId) return;
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

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
        <p className="text-muted">불러오는 중...</p>
      </main>
    );
  }

  if (!partyId) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
        <p className="text-sm text-muted">유효하지 않은 초대코드입니다.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          파티 상태 · {partyName || "마니또 파티"}
        </h1>
        <p className="text-sm text-muted">
          초대코드 기준으로 파티 상태를 확인합니다. 참여자 목록을 보고 매칭을 실행할 수 있습니다.
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

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <h2 className="text-lg font-semibold">매칭 상태</h2>
        {isMatched ? (
          <p className="text-sm text-green-300">🎁 매칭 완료된 파티입니다.</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              초대할 사람들을 모두 추가한 뒤, 매칭을 실행해 보세요.
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


