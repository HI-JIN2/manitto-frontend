import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Snow } from "@/components/Snow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "마니또 파티",
  description: "친구, 동료와 함께하는 비밀친구 추첨 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1021] via-[#0d1328] to-[#0b1021]">
          <Snow />
          <header className="border-b border-white/5 bg-surface/60 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <div className="h-9 w-9 rounded-2xl bg-accent/20 ring-1 ring-accent/30" />
                <p className="text-base text-foreground">마니또 파티</p>
              </Link>
              <div className="flex items-center gap-4">
                <nav className="flex items-center gap-3 text-sm text-muted">
                  <a className="rounded-full px-3 py-2 transition hover:text-foreground" href="/">
                    홈
                  </a>
                  <a className="rounded-full px-3 py-2 transition hover:text-foreground" href="/create">
                    파티 생성
                  </a>
                  <a
                    className="rounded-full px-3 py-2 transition hover:text-foreground"
                    href="/join"
                  >
                    파티 참여
                  </a>
                  <a
                    className="rounded-full px-3 py-2 transition hover:text-foreground"
                    href="/party/invite"
                  >
                    파티 상태
                  </a>
                </nav>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    게스트 모드
                  </span>
                  <a
                    href="/auth"
                    className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
                  >
                    로그인
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
          <footer className="border-t border-white/5 bg-surface/60 px-6 py-6 text-center text-xs text-muted">
            © 2025 마니또 파티. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
