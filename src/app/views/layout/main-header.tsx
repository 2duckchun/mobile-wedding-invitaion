import { Menu } from "lucide-react";

export const MainHeader = () => {
  return (
    <header className="base-container h-header bg-red-400">
      <div className="px-4 h-header flex justify-between items-center">
        <p>헤더</p>
        <Menu size={28} strokeWidth={2.75} />
      </div>
    </header>
  );
};
