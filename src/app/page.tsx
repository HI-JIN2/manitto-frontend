"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const links = [
  { href: "/create", label: "파티 생성 (게스트)" },
  { href: "/join", label: "초대코드로 참여" },
  { href: "/party/invite", label: "초대코드로 파티 상태 보기" },
  { href: "/match-result", label: "매칭 결과" },
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
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-surface-2 px-5 py-8 shadow-2xl shadow-black/40 sm:px-8 sm:py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-accent">마니또 파티</p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            로그인 없이 1분 만에
            <br />
            우리 팀만의 마니또 파티 만들기.
          </h1>
          <div className="max-w-3xl space-y-1 text-base text-muted sm:text-lg">
            <p>초간단 게스트 모드로 바로 시작하세요. 계정 없이도 파티를 만들 수 있어요.</p>
            <p>파티를 만든 뒤 초대 링크만 공유하면, 팀원들은 이름과 이메일만으로 참여합니다.</p>
            <p>이메일을 미리 알고 있다면 일괄 입력도 가능해서, 준비 시간이 훨씬 줄어듭니다.</p>
          </div>

          {stats && (
            <div className="mt-3 space-y-1 text-xs text-muted sm:text-sm">
              <p>
                지금까지 이 서비스에서{" "}
                <span className="font-semibold text-foreground">
                  {stats.partyCount}
                </span>
                번째 마니또 파티까지 만들어졌어요.
              </p>
              <p>
                현재{" "}
                <span className="font-semibold text-foreground">
                  {stats.participantCount}
                </span>
                명의 사람들이 마니또 파티를 사용하고 있어요.
              </p>
            </div>
          )}

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
  );
}
