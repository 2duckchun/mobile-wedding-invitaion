"use client";

import { useState } from "react";
import { useGetGuestbookReplies } from "@/domain/guestbook-message/hooks/use-get-guestbook-replies";
import { GuestbookPagination } from "../guestbook-pagination";
import { GuestbookMessageForm } from "../guestbook-message-form";
import { Button } from "@/shared/ui/button";

export function ReplySection({ parentId }: { parentId: string }) {
  const [page, setPage] = useState(1);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const pageSize = 3;

  const { messages, isLoading, error, totalPages, refetch } =
    useGetGuestbookReplies(parentId, page, pageSize);

  if (error)
    return (
      <div className="text-red-500 text-sm">답글을 불러오지 못했어요.</div>
    );

  return (
    <div className="mt-3 pl-4 border-l border-[#e2dfd2] space-y-3">
      {/* 목록 */}
      {isLoading ? (
        <ReplySkeleton />
      ) : (messages?.data ?? []).length === 0 ? (
        <div className="text-[13px] text-[#8b8377]">아직 답글이 없어요.</div>
      ) : (
        <div className="space-y-3">
          {messages?.data.map((r) => (
            <div key={r.id} className="py-2">
              <div className="text-[14px] text-[#4c443c] whitespace-pre-wrap break-words break-all font-['Noto_Serif_KR']">
                {r.message}
              </div>
              <div className="text-right text-[12px] text-[#8b8377] font-['Noto_Serif_KR']">
                <p>{r.name}</p>
                <p>{formatDate(r.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isSubmitOpen && (
        <Button
          className="w-full"
          size="sm"
          onClick={() => setIsSubmitOpen(true)}
        >
          답글 작성!
        </Button>
      )}
      {isSubmitOpen && (
        <GuestbookMessageForm
          isLoading={isLoading}
          parentId={parentId}
          onSuccess={() => {
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
    </div>
  );
}

function ReplySkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[50px] animate-pulse bg-[#fdfcf7] rounded" />
      <div className="w-full h-[50px] animate-pulse bg-[#fdfcf7] rounded" />
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear() % 100}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}
