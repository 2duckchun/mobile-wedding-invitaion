export const MainHeader = () => {
  return (
    <header
      className="base-container sticky top-0 z-10 h-header bg-white"
      role="banner"
    >
      <ul
        className="px-5 md:px-10 lg:px-16 h-header grid grid-cols-3 justify-between items-center"
        role="navigation"
      >
        <li className="text-left">
          <span
            className="inline-block transition hover:scale-105 font-semibold active:scale-95 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="신랑 신부 이름"
          >
            태수&지영
          </span>
        </li>
        <li className="text-center">
          <span
            className="inline-block transition hover:scale-105 font-semibold active:scale-95 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="오시는 길 안내"
          >
            오시는 길
          </span>
        </li>
        <li className="text-right">
          <span
            className="inline-block transition hover:scale-105 font-semibold active:scale-95 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="연락처 정보"
          >
            연락처
          </span>
        </li>
      </ul>
    </header>
  );
};
