import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Snow } from "@/components/Snow";
import { Penguin } from "@/components/Penguin";

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
  icons: {
    icon: "/logo_penguin.png",
    shortcut: "/logo_penguin.png",
    apple: "/logo_penguin.png",
  },
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
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 gap-3">
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
                <nav className="flex items-center gap-1.5 text-[10px] text-muted sm:gap-3 sm:text-xs md:text-sm">
                  <a className="rounded-full px-2 py-1.5 transition hover:text-foreground sm:px-3 sm:py-2" href="/">
                    홈
                  </a>
                  <a className="rounded-full px-2 py-1.5 transition hover:text-foreground sm:px-3 sm:py-2" href="/create">
                    생성
                  </a>
                  <a
                    className="rounded-full px-2 py-1.5 transition hover:text-foreground sm:px-3 sm:py-2"
                    href="/join"
                  >
                    참여
                  </a>
                  <a
                    className="rounded-full px-2 py-1.5 transition hover:text-foreground sm:px-3 sm:py-2"
                    href="/party/invite"
                  >
                    상태
                  </a>
                  <a
                    className="rounded-full px-2 py-1.5 transition hover:text-foreground sm:px-3 sm:py-2"
                    href="https://forms.gle/5treLCiYW9wb3Mx58"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    소리함
                  </a>
                </nav>
                <div className="flex items-center gap-2 text-xs sm:text-[11px]">
                  <span className="hidden rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-100 sm:inline">
                    게스트 모드
                  </span>
                  {/* <a
                    href="/auth"
                    className="rounded-full border border-white/10 px-3 py-1.5 font-semibold text-foreground transition hover:border-accent hover:text-accent"
                  >
                    로그인
                  </a> */}
                </div>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
          </main>
          <footer className="border-t border-white/5 bg-surface/60 px-4 py-4 text-center text-[10px] text-muted sm:px-6 sm:py-6 sm:text-xs">
            © 2025 마니또 파티. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
