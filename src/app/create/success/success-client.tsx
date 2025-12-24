"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Penguin } from "@/components/Penguin";

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
  const [linkCopied, setLinkCopied] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  // 받침이 있는지 확인하는 헬퍼 함수
  const hasBatchim = (text: string): boolean => {
    if (!text) return false;
    const lastChar = text[text.length - 1];
    const code = lastChar.charCodeAt(0);
    // 한글인 경우 받침 확인
    if (code >= 0xac00 && code <= 0xd7a3) {
      return (code - 0xac00) % 28 !== 0;
    }
    return false;
  };

  const inviteLink = useMemo(
    () =>
      typeof window !== "undefined" && inviteCode
        ? `${window.location.origin}/join/${inviteCode}`
        : "",
    [inviteCode],
  );

  const partyName = name || "새 마니또 파티";
  const particleEul = hasBatchim(partyName) ? "을" : "를";
  const particleEun = hasBatchim(partyName) ? "은" : "는";

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

  useEffect(() => {
    apiFetch<Stats>("/parties/stats")
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <div className="relative overflow-visible">
        {/* 펭귄 캐릭터 - 카드 오른쪽에 자연스럽게 배치 (예시 이미지처럼) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 hidden lg:block pointer-events-none">
          <Penguin size="xl" variant={1} lookLeft={true} showGift={false} />
        </div>
        <header className="space-y-2">
          <p className="text-sm text-accent">파티 생성 완료</p>
          <h1 className="text-3xl font-semibold">
            페니가 {partyName}{particleEul} 준비해뒀어요 🎁
          </h1>
        <div className="space-y-1 text-sm text-muted">
          <p>{partyName}{particleEun} 이 서비스에서 {partyId}번째로 생성된 마니또 파티예요.</p>
          {stats && (
            <p>
              현재{" "}
              <span className="font-semibold text-foreground">
                {stats.participantCount}
              </span>
              명의 사람들이 마니또 파티를 함께하고 있어요.
            </p>
          )}
          <p>아래 초대 링크와 코드를 복사해서 팀원에게 전달하세요.</p>
        </div>
      </header>
      </div>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20">
        <div className="space-y-1 text-sm">
          <p className="text-muted">초대코드</p>
          <p className="font-mono text-foreground">{inviteCode}</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-muted">초대 링크 (게스트 모드)</p>
          <div className="flex items-center gap-0">
            <p className="flex-1 truncate font-mono text-foreground pr-0">
              {inviteLink || "브라우저에서 확인 시 링크가 표시됩니다."}
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
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopyMessage}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {copied ? "복사됨" : "복사하기"}
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border-2 border-yellow-500/30 bg-yellow-500/5 px-6 py-6 shadow-xl shadow-black/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏳</span>
            <h2 className="text-lg font-semibold text-foreground">아직 매칭 전이에요</h2>
          </div>
          <p className="text-sm text-muted">
            참여자를 모두 추가한 뒤 파티 상태 페이지에서 매칭을 실행하세요. 페니가 조용히 지켜보고 있어요.
          </p>
          <Link
            href={`/party/invite/${inviteCode}`}
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            파티 상태 보러가기 →
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


