"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Drawer } from "./Drawer";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/create", label: "생성" },
  { href: "/join", label: "참여" },
  { href: "/party/invite", label: "상태" },
  {
    href: "https://forms.gle/5treLCiYW9wb3Mx58",
    label: "소리함",
    external: true,
  },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-white/5 bg-surface/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9">
            <Image
              src="/logo_penguin.png"
              alt="마니또 파티 로고"
              width={36}
              height={36}
              className="h-full w-full object-contain"
              priority
              unoptimized
            />
          </div>
          <p className="text-sm text-foreground sm:text-base">마니또 파티</p>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-1.5 text-[10px] text-muted sm:flex sm:gap-3 sm:text-xs md:text-sm">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  className="rounded-full px-2 py-1.5 transition hover:text-foreground sm:px-3 sm:py-2"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  className="rounded-full px-2 py-1.5 transition hover:text-foreground sm:px-3 sm:py-2"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 text-xs sm:text-[11px]">
            <span className="hidden rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-100 sm:inline">
              게스트 모드
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-3 py-1.5 text-xs text-foreground transition hover:border-white/30 sm:hidden"
              aria-label="메뉴 열기"
              aria-expanded={isOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-foreground">메뉴</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-muted transition hover:bg-surface-2 hover:text-foreground"
              aria-label="메뉴 닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col gap-2">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  className="rounded-xl border border-white/10 bg-surface-2 px-4 py-4 text-base text-foreground transition hover:border-white/20 hover:bg-surface"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  className="rounded-xl border border-white/10 bg-surface-2 px-4 py-4 text-base text-foreground transition hover:border-white/20 hover:bg-surface"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          
          <div className="mt-4 flex items-center justify-center">
            <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100">
              게스트 모드
            </span>
          </div>
        </div>
      </Drawer>
    </header>
  );
}

