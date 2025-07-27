export const MainHeader = () => {
  return (
    <header className="base-container sticky top-0 z-10 h-header bg-white">
      <ul className="px-5 md:px-10 lg:px-16 h-header grid grid-cols-3 justify-between items-center">
        <li className="text-left transition hover:scale-105 font-semibold active:scale-95 cursor-pointer">
          태수&지영
        </li>
        <li className="text-center transition hover:scale-105 font-semibold active:scale-95 cursor-pointer">
          오시는 길
        </li>
        <li className="text-right transition hover:scale-105 font-semibold active:scale-95 cursor-pointer">
          연락처
        </li>
      </ul>
    </header>
  );
};
