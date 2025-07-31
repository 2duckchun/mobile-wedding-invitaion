"use client";

import { useState } from "react";
import { GUESTBOOK_ID } from "@/shared/constant";
import { useGetGuestbookMessage } from "@/domain/guestbook-message/hooks/use-get-guestbook-message";
import { GuestbookMessageForm } from "./guestbook-message-form";
import { GuestbookMessageBox } from "./guestbook-message-box";
import { GuestbookPagination } from "./guestbook-pagination";

const pageSize = 3;

export const GuestbookMessageView = () => {
  const [page, setPage] = useState(1);
  const { messages, isLoading, error, refetch, totalPages } =
    useGetGuestbookMessage(page, pageSize);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <article id={GUESTBOOK_ID}>
      <header>
        <h3 className="text-2xl font-bold text-center">방명록 🖊️</h3>
      </header>
      <section className="my-5 border p-3 space-y-5 shadow-sm rounded">
        {/* 메시지 목록 */}
        {isLoading ? (
          <SkeletonList />
        ) : (
          <GuestbookMessageBox
            messageList={messages?.data || []}
            onDelete={() => {
              setPage(1);
              refetch();
            }}
          />
        )}
        {/* 페이지네이션 */}
        <GuestbookPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
        {/* 작성 폼 */}
        <GuestbookMessageForm
          onSuccess={() => {
            setPage(1);
            refetch();
          }}
          isLoading={isLoading}
        />
      </section>
    </article>
  );
};

const SkeletonList = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
      <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
      <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
    </div>
  );
};
