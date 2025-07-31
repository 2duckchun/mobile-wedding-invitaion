import { GuestbookMessage } from "@/domain/guestbook-message/schema";
import { X } from "lucide-react";
import { GuestbookMessageDeleteModal } from "./guestbook-message-delete-modal";
import { useState } from "react";

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
        <div key={msg.id} className="py-4">
          <div className="flex justify-between items-start gap-2">
            <p className="text-[15px] leading-relaxed text-[#4c443c] font-[500] whitespace-pre-wrap break-words break-all w-full font-['Noto_Serif_KR']">
              {msg.message}
            </p>
            <X
              aria-label="삭제"
              onClick={() => setTargetMessage(msg)}
              className="cursor-pointer w-4 h-4 text-gray-400 hover:text-[#6c5f43] mt-1"
            />
          </div>
          <div className="text-right mt-3 space-y-1 text-[13px] text-[#8b8377] font-light font-['Noto_Serif_KR']">
            <p>{msg.name}</p>
            <p>{formatDate(msg.created_at)}</p>
          </div>
        </div>
      ))}
      {targetMessage && (
        <GuestbookMessageDeleteModal
          id={targetMessage.id}
          isOpen={!!targetMessage}
          onClose={() => setTargetMessage(null)}
          onDelete={() => {
            setTargetMessage(null);
            onDelete();
          }}
        />
      )}
    </div>
  );
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear() % 100}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;
};
