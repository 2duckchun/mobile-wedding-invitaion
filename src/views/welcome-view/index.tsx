import Image from "next/image";

export const WelcomeView = () => {
  return (
    <article>
      <header className="sr-only">
        <h2>김태수, 박지영의 결혼식에 초대합니다.</h2>
      </header>
      <section className="h-[700px] flex justify-center items-center">
        <div className="relative h-full w-full rounded-t-[300px] overflow-hidden">
          <Image
            src="/images/wedding/welcome-view-1.jpg"
            alt="결혼식 초대장"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-none" />
        </div>
      </section>
      <div className="flex flex-col gap-1 my-5">
        <p className="font-gowundodum text-center">새로운 시작을 맞이하는</p>
        <p className="font-gowundodum text-center">지영이와 태수의 결혼식에</p>
        <p className="font-gowundodum text-center">당신을 초대합니다.</p>
      </div>
    </article>
  );
};
