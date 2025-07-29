"use client";

import { useEffect, useState } from "react";
import { scrollToElement, scrollToTop } from "@/lib/scroll-action";
import { GUESTBOOK_ID, WEDDING_PLACE_ID } from "@/shared/constant";
import { throttle } from "@/lib/throttle";

export const MainHeader = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  const scrollToWeddingPlace = () => {
    scrollToElement(WEDDING_PLACE_ID);
  };

  const scrollToGuestbook = () => {
    scrollToElement(GUESTBOOK_ID);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight === 0 ? 0 : (scrollTop / docHeight) * 100;
      setScrollPercent(percent);
    };

    const throttledScroll = throttle(handleScroll, 30);

    handleScroll();

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <>
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
              onClick={scrollToTop}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
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
              onClick={scrollToWeddingPlace}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollToWeddingPlace();
                }
              }}
            >
              오시는 길
            </span>
          </li>
          <li className="text-right">
            <span
              className="inline-block transition hover:scale-105 font-semibold active:scale-95 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="방명록"
              onClick={scrollToGuestbook}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollToGuestbook();
                }
              }}
            >
              방명록
            </span>
          </li>
        </ul>

        {/* 👇 스크롤 진행 바 */}
        <div className="h-1 w-full bg-gray-200">
          <div
            className="h-full bg-pink-400 transition-all duration-100"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </header>
    </>
  );
};
