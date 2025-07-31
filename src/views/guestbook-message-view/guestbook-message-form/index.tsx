import { submitMessage } from "@/domain/guestbook-message/actions/submit-message";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { useState } from "react";

type GuestbookMessageFormProps = {
  isLoading: boolean;
  onSuccess: () => void;
};

export const GuestbookMessageForm = ({
  isLoading,
  onSuccess,
}: GuestbookMessageFormProps) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async () => {
    if (!name || !password || !content)
      return alert("모든 항목을 입력해주세요.");

    if (content.length > 200) {
      return alert("메시지는 200자 이하로 입력해주세요.");
    }
    const res = await submitMessage(name, content, password);
    if (res.success) {
      onSuccess();
      setName("");
      setPassword("");
      setContent("");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-4 w-full">
        <div className="w-full">
          <Label htmlFor="name">성함</Label>
          <Input
            placeholder="성함을 입력해주세요."
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Textarea
          placeholder="응원의 한마디를 보내주세요!"
          className="resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="text-right">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          {isLoading ? "전송 중..." : "방명록 남기기"}
        </button>
      </div>
    </div>
  );
};
