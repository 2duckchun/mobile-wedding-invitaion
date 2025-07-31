import { deleteMessage } from "@/domain/guestbook-message/actions/delete-message";
import { GuestbookMessage } from "@/domain/guestbook-message/schema";
import { X } from "lucide-react";

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
  const handleDelete = async (id: string) => {
    const pw = prompt("메시지 삭제를 위해 비밀번호를 입력해주세요");
    if (!pw) return;

    const res = await deleteMessage(id, pw);
    if (res.success) {
      alert("메시지가 삭제되었습니다.");
      onDelete();
    } else {
      alert(res.message);
    }
  };

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
  );
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear() % 100}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;
};
