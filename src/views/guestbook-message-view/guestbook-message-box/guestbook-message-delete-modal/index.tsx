import { deleteMessage } from "@/domain/guestbook-message/actions/delete-message";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Modal } from "@/shared/ui/modal";
import { useState } from "react";

type GuestbookMessageDeleteModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const GuestbookMessageDeleteModal = ({
  id,
  isOpen,
  onClose,
  onDelete,
}: GuestbookMessageDeleteModalProps) => {
  const [password, setPassword] = useState("");
  const handleDelete = async () => {
    const res = await deleteMessage(id, password);
    if (res.success) {
      alert("메시지가 삭제되었습니다.");
      onDelete();
    } else {
      alert(res.message);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setPassword("");
        onClose();
      }}
    >
      <div className="flex p-5 flex-col gap-4">
        <h2 className="text-2xl font-bold">메시지 삭제</h2>
        <p className="text-sm text-gray-500">
          비밀번호를 잊으셨다면 <b className="text-pink-500">신랑</b>에게
          말씀해주세요...!
        </p>
        <Input
          type="password"
          className="w-full"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleDelete} variant="destructive">
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
};
