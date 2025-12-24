"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Penguin } from "@/components/Penguin";

const links = [
  { href: "/create", label: "파티 생성 (게스트)" },
  { href: "/join", label: "초대코드로 참여" },
  { href: "/party/invite", label: "초대코드로 파티 상태 보기" },
];

type Stats = {
  partyCount: number;
  participantCount: number;
};

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiFetch<Stats>("/parties/stats")
      .then(setStats)
      .catch(() => {
        setStats(null);
      });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative overflow-visible">
        {/* 펭귄 캐릭터 - 데스크톱: 카드 오른쪽, 모바일: 카드 아래 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block pointer-events-none">
          <Penguin size="xl" variant={3} lookLeft={true} showGift={false} />
        </div>
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-surface-2 px-5 py-8 shadow-2xl shadow-black/40 sm:px-8 sm:py-10 md:px-10 md:py-12">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                로그인 없이 1분 이면 
                <br />
                우리 팀만의 마니또 파티
              </h1>
            </div>
          <div className="max-w-3xl space-y-1 text-base text-muted sm:text-lg">
            <p>복잡한 가입 없이 게스트 모드로 바로 시작하세요.</p>
            <p>파티를 만든 뒤 초대 링크만 공유하면, 친구들은 이름과 이메일만으로 가볍게 참여할 수 있어요.</p>
            <p>친구들의 이메일을 미리 알고 있다면 방장이 한 번에 입력할 수 있어요.</p>
          </div>

          {stats && (
            <div className="mt-3 space-y-1 text-xs text-muted sm:text-sm">
              <p>
                지금까지 {" "}
                <span className="font-semibold text-foreground">
                  {stats.partyCount}
                </span>
                개의 마니또 파티가 만들어졌어요.
              </p>
              <p>
                현재{" "}
                <span className="font-semibold text-foreground">
                  {stats.participantCount}
                </span>
                명의 사람들이 마니또 파티를 함께하고 있어요.
              </p>
              <p>              
                조용하지만 따뜻한 파티, 지금 바로 시작해 보세요. 🎁
                </p>
              <p className="text-xs text-muted mt-2">
                — 페니 드림 🐧
              </p>
            </div>
          )}

          {/* 모바일에서 펭귄 표시 (버튼 위) */}
          <div className="flex justify-center lg:hidden pointer-events-none -my-2">
            <Penguin size="xl" variant={3} lookLeft={true} showGift={false} />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                className="rounded-full border border-white/10 bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
