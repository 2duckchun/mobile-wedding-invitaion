"use client";

import { CONTACT_INFO_ID } from "@/shared/constant";

export const BlessingAccountView = () => {
  // ⚠️ 복사 로직은 재사용할 수 있도록 함수로 분리
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("계좌번호가 복사되었습니다.");
    } catch {
      alert("복사 권한을 허용해 주세요.");
    }
  };

  return (
    <article
      className="w-full max-w-lg mx-auto font-gowundodum"
      id={CONTACT_INFO_ID}
    >
      {/* 섹션 타이틀 */}
      <h3 className="mb-8 text-center text-xl tracking-wide">마음 전하실 곳</h3>

      {/* ── 신랑측 ─────────────────────────────── */}
      <section className="mb-10 space-y-6">
        <h4 className="text-center text-base font-medium text-slate-800">
          신랑측
        </h4>

        {/* 신랑 */}
        <div className="space-y-3">
          {/* 라벨 */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">신랑</p>
            <p className="text-sm text-gray-700">김태수</p>
          </div>

          {/* 계좌 + 버튼 */}
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs text-gray-500">국민은행</p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                00000000000
              </p>
            </div>
            <button
              className="shrink-0 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              onClick={() => copyToClipboard("00000000000")}
            >
              복사
            </button>
          </div>
        </div>

        {/* 신랑 아버지 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">신랑 아버지</p>
            <p className="text-sm text-gray-700">김종덕</p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs text-gray-500">국민은행</p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                00000000000
              </p>
            </div>
            <button
              className="shrink-0 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              onClick={() => copyToClipboard("00000000000")}
            >
              복사
            </button>
          </div>
        </div>

        {/* 신랑 어머니 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">신랑 어머니</p>
            <p className="text-sm text-gray-700">김미희</p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs text-gray-500">국민은행</p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                00000000000
              </p>
            </div>
            <button
              className="shrink-0 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              onClick={() => copyToClipboard("00000000000")}
            >
              복사
            </button>
          </div>
        </div>
      </section>

      {/* ── 신부측 ─────────────────────────────── */}
      <section className="space-y-6">
        <h4 className="text-center text-base font-medium text-slate-800">
          신부측
        </h4>

        {/* 신부 */}
        <div className="space-y-3">
          {/* 라벨 */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">신부</p>
            <p className="text-sm text-gray-700">박지영</p>
          </div>

          {/* 계좌 + 버튼 */}
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs text-gray-500">국민은행</p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                00000000000
              </p>
            </div>
            <button
              className="shrink-0 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              onClick={() => copyToClipboard("00000000000")}
            >
              복사
            </button>
          </div>
        </div>

        {/* 신부 아버지 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">신부 아버지</p>
            <p className="text-sm text-gray-700">박호경</p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs text-gray-500">국민은행</p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                00000000000
              </p>
            </div>
            <button
              className="shrink-0 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              onClick={() => copyToClipboard("00000000000")}
            >
              복사
            </button>
          </div>
        </div>

        {/* 신부 어머니 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">신부 어머니</p>
            <p className="text-sm text-gray-700">오주영</p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs text-gray-500">국민은행</p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                00000000000
              </p>
            </div>
            <button
              className="shrink-0 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              onClick={() => copyToClipboard("00000000000")}
            >
              복사
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
