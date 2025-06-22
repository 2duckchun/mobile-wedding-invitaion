"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
const ClientCalendar = dynamic(
  () => import("@/shared/ui/calendar").then((m) => m.Calendar),
  { ssr: false }
);

export const CalendarView = () => {
  /** 🎯 결혼식 날짜 – 현지(자정)로 생성 */
  const weddingDate = useMemo(() => new Date(2025, 10, 22), []); // 10 = 11월

  /** D-Day 계산 (동일) */
  const dDay = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 자정 고정

    const diffDays = Math.ceil(
      (weddingDate.getTime() - today.getTime()) / 86_400_000
    );

    return diffDays > 0
      ? `D-${diffDays}`
      : diffDays === 0
      ? "D-DAY"
      : `D+${Math.abs(diffDays)}`;
  }, [weddingDate]);

  return (
    <article className="w-full max-w-lg mx-auto space-y-6 font-gowundodum">
      <section className="text-center space-y-4">
        <h3 className="text-xl font-bold">🎉 Wedding Day 🎉</h3>
        <p className="text-2xl font-semibold text-rose-600">{dDay}</p>
        <div className="flex justify-center">
          <ClientCalendar
            className="w-full max-w-[400px]"
            mode="single" /* ← 강조 */
            defaultMonth={weddingDate}
            selected={weddingDate}
            onSelect={() => {}}
            modifiers={{
              saturday: { dayOfWeek: [6] }, // 6 = Sat
              sunday: { dayOfWeek: [0] }, // 0 = Sun
            }}
            modifiersClassNames={{
              saturday: "text-blue-500 font-bold", // 토요일 → 파랑
              sunday: "text-rose-500 font-bold", // 일요일 → 빨강
            }}
          />
        </div>
      </section>
    </article>
  );
};
