export const IntroFamilyMemberView = () => {
  return (
    <article className="w-full max-w-lg mx-auto font-gowundodum">
      {/* 섹션 타이틀 */}
      <h3 className="mb-6 text-center text-xl tracking-wide">
        양가 혼주 및 우리들 소개
      </h3>

      <section className="space-y-6">
        {/* ── 신랑 라인 ───────────────────────── */}
        <div className="flex items-end justify-center flex-wrap gap-4 text-center">
          <div className="flex items-end">
            <p className="mt-1 text-base text-gray-700">
              김종덕&nbsp;·&nbsp;김미희
            </p>
            <p className="text-sm text-gray-500">의&nbsp;차남</p>
          </div>
          <div>
            {/* <p className="text-sm text-gray-500">신랑</p> */}
            <p className="mt-1 text-md font-semibold text-slate-800">김태수</p>
          </div>
        </div>

        {/* ── 신부 라인 ───────────────────────── */}
        <div className="flex items-end justify-center flex-wrap gap-4 text-center">
          <div className="flex items-end">
            <p className="mt-1 text-base text-gray-700">
              박호경&nbsp;·&nbsp;오주영
            </p>
            <p className="text-sm text-gray-500">의&nbsp;장녀</p>
          </div>
          <div>
            {/* <p className="text-sm text-gray-500">신부</p> */}
            <p className="mt-1 text-md font-semibold text-slate-800">박지영</p>
          </div>
        </div>
      </section>
    </article>
  );
};
