"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type ParticipantInput = {
  name: string;
  email: string;
};

export default function CreatePartyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rawList, setRawList] = useState("");

  const participants: ParticipantInput[] = useMemo(() => {
    return rawList
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [namePart, emailPart] = line.split(",").map((s) => s?.trim() ?? "");
        return { name: namePart ?? "", email: emailPart ?? "" };
      })
      .filter((p) => p.email);
  }, [rawList]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await apiFetch<{
        id: number;
        inviteCode: string;
      }>("/parties/guest", {
        method: "POST",
        body: {
          name,
          hostName,
          hostEmail,
          participants: participants.length ? participants : undefined,
        },
      });

      const search = new URLSearchParams({
        partyId: String(res.id),
        inviteCode: res.inviteCode ?? "",
        name,
      });

      router.push(`/create/success?${search.toString()}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus(err.message);
      } else {
        setStatus("생성 실패");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">마니또 파티 만들기</h1>
        <p className="text-sm text-muted">
          기본 게스트 모드: 호스트 이름/이메일로 파티를 만들고, 초대코드/참여 링크를 배포하세요.
        </p>
      </header>

      <form
        onSubmit={handleCreate}
        className="space-y-4 rounded-2xl border border-white/10 bg-surface px-6 py-6 shadow-xl shadow-black/20"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-muted">호스트 이름</label>
            <input
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
              placeholder="방장 이름"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">호스트 이메일</label>
            <input
              value={hostEmail}
              onChange={(e) => setHostEmail(e.target.value)}
              required
              type="email"
              className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
              placeholder="host@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted">파티 이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
            placeholder="예) 팀 연말 이벤트"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted">
            팀원 이름+이메일 일괄 입력 (선택)
          </label>
          <textarea
            value={rawList}
            onChange={(e) => setRawList(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none transition focus:border-accent"
            placeholder={`홍길동,hong@example.com\n김철수,chulsoo@example.com`}
          />
          <p className="text-xs text-muted">
            팀원 이메일을 알고 있다면, 여기에서 미리 적어 둘 수 있어요.
            한 줄에 사람 한 명씩, 「이름,이메일」 형식으로 입력하면 됩니다.
            예를 들어, <span className="font-mono">홍길동,hong@example.com</span> 처럼
            적어 주세요. 비워두면 방장만 포함된 파티가 만들어져요.
          </p>
          {participants.length > 0 && (
            <div className="rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-xs text-muted">
              전송 예정 {participants.length}명:{" "}
              {participants
                .map((p) => `${p.name || "(이름없음)"} <${p.email}>`)
                .join(", ")}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "생성 중..." : "파티 생성"}
        </button>
      </form>

      {status && (
        <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {status}
        </div>
      )}
    </main>
  );
}

