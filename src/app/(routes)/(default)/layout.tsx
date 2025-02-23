import { MainHeader } from "@/app/views/layout/main-header";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      <main className="base-container min-h-screen">{children}</main>
      <footer className="base-container">dd</footer>
    </>
  );
}
