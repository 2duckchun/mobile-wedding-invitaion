"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { GuestbookMessage } from "@/domain/guestbook-message/schema";
import { GuestbookMessageDeleteModal } from "./guestbook-message-delete-modal";
import { ReplySection } from "../reply-section";
import { useGetReplyCount } from "@/domain/guestbook-message/hooks/use-get-reply-count";

type GuestbookMessageBoxProps = {
  messageList: Pick<
    GuestbookMessage,
    "message" | "id" | "name" | "created_at"
  >[];
  onDelete: () => void;
};

export const GuestbookMessageBox = ({
  messageList,
  onDelete,
}: GuestbookMessageBoxProps) => {
  const [targetMessage, setTargetMessage] = useState<Pick<
    GuestbookMessage,
    "id"
  > | null>(null);

  return (
    <div className="divide-y divide-[#e2dfd2]">
      {messageList.map((msg) => (
        <MessageItem
          key={msg.id}
          msg={msg}
          onRequestDelete={() => setTargetMessage(msg)}
        />
      ))}

      {targetMessage && (
        <GuestbookMessageDeleteModal
          id={targetMessage.id}
          isOpen={!!targetMessage}
          onClose={() => setTargetMessage(null)}
          onDelete={() => {
            setTargetMessage(null);
            onDelete(); // 최상위 메시지 삭제 후 상단 목록 리프레시
          }}
        />
      )}
    </div>
  );
};

function MessageItem({
  msg,
  onRequestDelete,
}: {
  msg: Pick<GuestbookMessage, "message" | "id" | "name" | "created_at">;
  onRequestDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  // 서버에서 답글 총 개수
  const { total, refetch } = useGetReplyCount(msg.id);
  // 낙관적 보정값(등록 +1 / 삭제 -1)
  const [localTotal, setLocalTotal] = useState<number | null>(null);

  const shownTotal = localTotal ?? total ?? 0;

  return (
    <div className="py-4">
      <div className="flex justify-between items-start gap-2">
        <p className="text-[15px] leading-relaxed text-[#4c443c] font-[500] whitespace-pre-wrap break-words break-all w-full font-['Noto_Serif_KR']">
          {msg.message}
        </p>
        <X
          aria-label="삭제"
          onClick={onRequestDelete}
          className="cursor-pointer w-4 h-4 text-gray-400 hover:text-[#6c5f43] mt-1"
        />
      </div>

      <div className="text-right mt-3 space-y-1 text-[13px] text-[#8b8377] font-light font-['Noto_Serif_KR']">
        <p>{msg.name}</p>
        <p>{formatDate(msg.created_at)}</p>
      </div>

      <div className="mt-3 pl-4 border-l border-[#e2dfd2]">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[13px] text-[#6c5f43] hover:underline"
        >
          {open
            ? "답글 숨기기"
            : shownTotal > 0
            ? `답글 ${shownTotal}개 보기`
            : "답글 쓰기"}
        </button>

        {open && (
          <ReplySection
            parentId={msg.id}
            onSubmitted={async () => {
              setLocalTotal((n) => (n ?? total ?? 0) + 1);
              await refetch();
            }}
            onDeleted={async () => {
              setLocalTotal((n) => Math.max((n ?? total ?? 0) - 1, 0));
              await refetch();
            }}
          />
        )}
      </div>
    </div>
  );
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear() % 100}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;
};
