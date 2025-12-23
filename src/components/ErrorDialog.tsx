"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function ErrorDialog({ open, message, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-red-400/30 bg-surface px-5 py-5 shadow-2xl shadow-black/50">
        <p className="text-sm font-semibold text-red-200">요청을 처리하는 중 문제가 발생했어요</p>
        <p className="mt-3 text-sm text-red-100 whitespace-pre-wrap">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-red-100 transition hover:border-red-300 hover:text-red-50"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}


