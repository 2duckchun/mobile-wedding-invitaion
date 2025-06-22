export const IntroFamilyMemberView = () => {
  return (
    <article>
      <header className="sr-only">
        <h2>양가 혼주 및 우리들 소개입니다.</h2>
      </header>
      <div>양가 혼주 및 우리들 소개</div>
      <section className="h-[500px] bg-teal-200 grid grid-cols-2">
        <div className="bg-slate-100"></div>
        <div className="bg-neutral-200"></div>
      </section>
      <div className="flex flex-col gap-1 my-5">
        <p className="font-gowundodum text-center">우리가 맹세하는 자리에서</p>
        <p className="font-gowundodum text-center">
          축복을 빌어주시면 감사하겠습니다.
        </p>
      </div>
    </article>
  );
};
