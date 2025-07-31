"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { deleteMessage } from "@/domain/guestbook-message/actions/delete-message";
import { GUESTBOOK_ID } from "@/shared/constant";
import { useGetGuestbookMessage } from "@/domain/guestbook-message/hooks/use-get-guestbook-message";
import { GuestbookMessageForm } from "./guestbook-message-form";

const pageSize = 5;

export const GuestbookMessageView = () => {
  const [page, setPage] = useState(1);
  const { messages, isLoading, error, refetch } = useGetGuestbookMessage(
    page,
    pageSize
  );

  const handleDelete = async (id: string) => {
    const pw = prompt("메시지 삭제를 위해 비밀번호를 입력해주세요");
    if (!pw) return;

    const res = await deleteMessage(id, pw);
    if (res.success) {
      alert("메시지가 삭제되었습니다.");
      await refetch();
    } else {
      alert(res.message);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear() % 100}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const totalPages = Math.ceil((messages?.total || 0) / pageSize) || 1;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <article id={GUESTBOOK_ID}>
      <header>
        <h3 className="text-2xl font-bold text-center">방명록 🖊️</h3>
      </header>
      <section className="my-5 border p-3 space-y-5 shadow-sm rounded">
        {/* 메시지 목록 */}
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
            <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
            <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
            <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
            <div className="w-full h-[80px] animate-pulse bg-[#fdfcf7] rounded-xl" />
          </div>
        ) : (
          <div className="bg-[#fdfcf7] rounded-xl shadow-md px-6 py-4 border border-[#e8e6da]">
            <div className="divide-y divide-[#e2dfd2]">
              {messages?.data.map((msg) => (
                <div key={msg.id} className="py-4">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-[15px] leading-relaxed text-[#4c443c] font-[500] whitespace-pre-wrap break-words break-all w-full font-['Noto_Serif_KR']">
                      {msg.message}
                    </p>
                    <X
                      aria-label="삭제"
                      onClick={() => handleDelete(msg.id)}
                      className="cursor-pointer w-4 h-4 text-gray-400 hover:text-[#6c5f43] mt-1"
                    />
                  </div>
                  <div className="text-right mt-3 space-y-1 text-[13px] text-[#8b8377] font-light font-['Noto_Serif_KR']">
                    <p>{msg.name}</p>
                    <p>{formatDate(msg.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="text-center">
          <div className="inline-flex gap-2 mt-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 rounded border bg-white text-sm disabled:opacity-40"
            >
              이전
            </button>
            <span className="px-2 text-sm">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 rounded border bg-white text-sm disabled:opacity-40"
            >
              다음
            </button>
          </div>
        </div>

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
