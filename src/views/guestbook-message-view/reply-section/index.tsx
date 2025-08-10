"use client";

import { useState } from "react";
import { useGetGuestbookReplies } from "@/domain/guestbook-message/hooks/use-get-guestbook-replies";
import { GuestbookPagination } from "../guestbook-pagination";
import { GuestbookMessageForm } from "../guestbook-message-form";
import { Button } from "@/shared/ui/button";
import { GuestbookMessage } from "@/domain/guestbook-message/schema";
import { GuestbookMessageDeleteModal } from "../guestbook-message-box/guestbook-message-delete-modal";
import { X } from "lucide-react";

export function ReplySection({
  parentId,
  onSubmitted,
  onDeleted,
}: {
  parentId: string;
  onSubmitted?: () => void;
  onDeleted?: () => void;
}) {
  const [page, setPage] = useState(1);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const pageSize = 3;

  const { messages, isLoading, error, totalPages, refetch } =
    useGetGuestbookReplies(parentId, page, pageSize);

  if (error)
    return (
      <div className="text-red-500 text-sm">답글을 불러오지 못했어요.</div>
    );

  const list = messages?.data ?? [];

  const handleDeleted = async () => {
    if (list.length <= 1 && page > 1) {
      setPage((p) => p - 1);
    }
    await refetch();
    onDeleted?.();
  };

  return (
    <div className="mt-3 pl-4 border-l border-[#e2dfd2] space-y-3">
      {/* 목록 */}
      {isLoading ? (
        <ReplySkeleton />
      ) : list.length === 0 ? (
        <div className="text-[13px] text-[#8b8377]">아직 답글이 없어요.</div>
      ) : (
        <div className="space-y-3">
          {list.map((r) => (
            <ReplyItem key={r.id} reply={r} onDeleted={handleDeleted} />
          ))}
        </div>
      )}

      {/* 작성 폼 토글 */}
      {!isSubmitOpen && (
        <Button
          className="w-full"
          size="sm"
          onClick={() => setIsSubmitOpen(true)}
        >
          답글 작성!
        </Button>
      )}

      {/* 작성 폼 */}
      {isSubmitOpen && (
        <GuestbookMessageForm
          isLoading={isLoading}
          parentId={parentId}
          onSuccess={() => {
            setPage(1);
            refetch();
            setIsSubmitOpen(false);
            onSubmitted?.();
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

function ReplyItem({
  reply,
  onDeleted,
}: {
  reply: Pick<
    GuestbookMessage,
    "id" | "name" | "message" | "created_at" | "parent_id"
  >;
  onDeleted: () => void;
}) {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="py-4">
      <div className="flex justify-between items-start gap-2">
        <p className="text-[14px] text-[#4c443c] whitespace-pre-wrap break-words break-all">
          {reply.message}
        </p>
        <X
          aria-label="삭제"
          onClick={() => setOpenDelete(true)}
          className="cursor-pointer w-4 h-4 text-gray-400 hover:text-[#6c5f43] mt-1"
        />
      </div>

      <div className="text-right text-[12px] mt-3 space-y-1 text-[#8b8377]">
        <p>{reply.name}</p>
        <p>{formatDate(reply.created_at)}</p>
      </div>

      {openDelete && (
        <GuestbookMessageDeleteModal
          id={reply.id}
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          onDelete={() => {
            setOpenDelete(false);
            onDeleted?.();
          }}
        />
      )}
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
