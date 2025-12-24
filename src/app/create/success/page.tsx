"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CreateSuccessClient } from "./success-client";

function CreateSuccessContent() {
  const searchParams = useSearchParams();
  const partyId = searchParams.get("partyId") ?? "";
  const inviteCode = searchParams.get("inviteCode") ?? "";
  const name = searchParams.get("name") ?? "";

  if (!partyId) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
        <h1 className="text-2xl font-semibold">파티 정보를 찾을 수 없습니다.</h1>
        <p className="text-sm text-muted">다시 파티를 생성해 주세요.</p>
        <Link
          href="/create"
          className="mt-2 inline-flex w-fit rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
        >
          파티 다시 만들기
        </Link>
      </main>
    );
  }

  return <CreateSuccessClient partyId={partyId} inviteCode={inviteCode} name={name} />;
}

export default function CreateSuccessPage() {
  return (
    <Suspense>
      <CreateSuccessContent />
    </Suspense>
  );
}

