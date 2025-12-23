"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

type Stats = {
  partyCount: number;
  participantCount: number;
};

type Props = {
  partyId: string;
  inviteCode: string;
  name: string;
};

export function CreateSuccessClient({ partyId, inviteCode, name }: Props) {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  const inviteLink = useMemo(
    () =>
      typeof window !== "undefined" && inviteCode
        ? `${window.location.origin}/join/${inviteCode}`
        : "",
    [inviteCode],
  );

  const handleCopy = async () => {
    const text = inviteLink || `파티 ID: ${partyId}, 초대코드: ${inviteCode}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    apiFetch<Stats>("/parties/stats")
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm text-accent">파티 생성 완료</p>
        <h1 className="text-3xl font-semibold">
          {name || "새 마니또 파티"}가 준비됐어요 🎁
        </h1>
        <div className="space-y-1 text-sm text-muted">
          <p>{name || "새 마니또 파티"}는 이 서비스에서 {partyId}번째로 생성된 마니또 파티예요.</p>
          {stats && (
            <p>
              현재{" "}
              <span className="font-semibold text-foreground">
                {stats.participantCount}
              </span>
              명의 사람들이 마니또 파티를 사용하고 있어요.
            </p>
          )}
          <p>아래 초대 링크와 코드를 복사해서 팀원에게 전달하세요.</p>
        </div>
      </header>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <div className="space-y-1 text-sm">
          <p className="text-muted">초대코드</p>
          <p className="font-mono text-foreground">{inviteCode}</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-muted">초대 링크 (게스트 모드)</p>
          <p className="truncate font-mono text-foreground">
            {inviteLink || "브라우저에서 확인 시 링크가 표시됩니다."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopy}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {copied ? "복사됨" : "초대 정보 복사"}
          </button>
          <Link
            href={`/party/invite/${inviteCode}`}
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent"
          >
            파티 상태 보러가기
          </Link>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface px-6 py-6 text-sm text-muted">
        <p>게스트 모드 안내</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>링크를 받은 사람은 로그인 없이 이름/이메일만으로 참여할 수 있습니다.</li>
          <li>방장은 파티 상태 페이지에서 참여자 목록과 매칭 상태를 확인할 수 있습니다.</li>
        </ul>
      </section>
    </main>
  );
}


