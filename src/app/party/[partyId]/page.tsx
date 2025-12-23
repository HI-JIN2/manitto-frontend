"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

type Participant = { id: number; email: string };

export default function PartyStatusPage() {
  const { partyId } = useParams<{ partyId: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMatched, setIsMatched] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const people = await apiFetch<Participant[]>(
          `/parties/${partyId}/participants`,
        );
        setParticipants(people);

        const status = await apiFetch<{ matched: boolean }>(
          `/parties/${partyId}/status`,
        );
        setIsMatched(status.matched);
      } catch (err: any) {
        setMessage(err.message ?? "파티 정보를 불러올 수 없습니다");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [partyId]);

  const handleMatch = async () => {
    setMessage(null);
    try {
      await apiFetch(`/parties/${partyId}/match`, { method: "POST" });
      setMessage("매칭 완료! 이메일이 발송되었을 수 있습니다.");
      setIsMatched(true);
    } catch (err: any) {
      setMessage(err.message ?? "매칭 실패");
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
        <p className="text-sm text-muted">/party/{partyId}</p>
        <h1 className="text-2xl font-semibold">파티 상태</h1>
      </header>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6">
        <h2 className="text-lg font-semibold">참여자</h2>
        {participants.length === 0 ? (
          <p className="text-sm text-muted">아직 참가자가 없습니다.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {participants.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-white/5 bg-surface-2 px-3 py-2 text-muted"
              >
                {p.email}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6">
        <h2 className="text-lg font-semibold">매칭 상태</h2>
        {isMatched ? (
          <p className="text-sm text-green-300">🎁 매칭 완료된 파티입니다.</p>
        ) : (
          <button
            onClick={handleMatch}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            매칭 시작
          </button>
        )}
        {message && (
          <p className="text-sm text-muted">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}

