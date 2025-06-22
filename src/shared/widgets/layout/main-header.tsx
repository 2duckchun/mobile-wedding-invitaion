export const MainHeader = () => {
  return (
    <header className="font-cafe24 base-container sticky top-0 z-10 h-header bg-white">
      <ul className="px-5 md:px-10 lg:px-16 h-header grid grid-cols-3 justify-between items-center">
        <li className="text-left">태수&지영</li>
        <li className="text-center">오시는 길</li>
        <li className="text-right">연락처</li>
      </ul>
    </header>
  );
};
