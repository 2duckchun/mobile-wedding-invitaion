import { MainHeader } from "@/shared/widgets/layout/main-header";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MainHeader />
      <main className="base-container py-5 px-5 rounded-b-xl bg-white shadow-lg overflow-hidden">
        {children}
      </main>
      <footer className="text-center py-5 md:py-10 text-sm text-gray-500">
        ❤️ TSJY COMPANY 2025 ❤️
      </footer>
    </div>
  );
}
