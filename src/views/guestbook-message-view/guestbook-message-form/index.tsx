"use client";

import { submitMessage } from "@/domain/guestbook-message/actions/submit-message";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { useState } from "react";

type GuestbookMessageFormProps = {
  isLoading: boolean;
  onSuccess: () => void;
  parentId?: string; // ✅ 있으면 대댓글 모드
  maxLength?: number; // ✅ 기본 200
  labels?: {
    name?: string;
    password?: string;
    content?: string;
    button?: string;
    contentPlaceholder?: string;
  };
};

export const GuestbookMessageForm = ({
  isLoading,
  onSuccess,
  parentId,
  maxLength = 200,
  labels,
}: GuestbookMessageFormProps) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const isReply = Boolean(parentId);
  const l = {
    name: labels?.name ?? "성함",
    password: labels?.password ?? "비밀번호",
    content: labels?.content ?? (isReply ? "답글" : "메시지"),
    button: labels?.button ?? (isReply ? "답글 등록" : "방명록 남기기"),
    contentPlaceholder:
      labels?.contentPlaceholder ??
      (isReply ? "답글을 입력하세요!" : "응원의 한마디를 보내주세요!"),
  };

  const onSubmit = async () => {
    if (!name || !password || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (content.length > maxLength) {
      alert(`${l.content}는 ${maxLength}자 이하로 입력해주세요.`);
      return;
    }

    // ✅ parentId 전달 → 서버 액션에서 대댓글로 처리
    const res = await submitMessage(name, content, password, parentId ?? null);
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
          <Label htmlFor={`name-${parentId ?? "root"}`}>{l.name}</Label>
          <Input
            placeholder={`${l.name}을 입력해주세요.`}
            id={`name-${parentId ?? "root"}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor={`password-${parentId ?? "root"}`}>{l.password}</Label>
          <Input
            placeholder={`${l.password}를 입력해주세요`}
            type="password"
            id={`password-${parentId ?? "root"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor={`content-${parentId ?? "root"}`}>{l.content}</Label>
        <Textarea
          id={`content-${parentId ?? "root"}`}
          placeholder={l.contentPlaceholder}
          className="resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="text-right text-xs text-[#8b8377] mt-1">
          {content.length} / {maxLength}
        </div>
      </div>
      <div className="text-right">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {l.button}
        </button>
      </div>
    </div>
  );
};
