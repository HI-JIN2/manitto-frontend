import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Snow } from "@/components/Snow";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

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
          <SiteHeader />
          <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
          </main>
          <footer className="border-t border-white/5 bg-surface/60 px-4 py-4 text-center text-[10px] text-muted sm:px-6 sm:py-6 sm:text-xs">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted sm:text-xs">
                <Link className="transition hover:text-foreground" href="/privacy">
                  개인정보처리방침
                </Link>
                <span className="text-white/10">|</span>
                <Link className="transition hover:text-foreground" href="/terms">
                  이용약관
                </Link>
              </div>
              <p>© 2025 마니또 파티. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
