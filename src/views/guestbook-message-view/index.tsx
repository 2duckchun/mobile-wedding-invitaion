"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { X } from "lucide-react";
import { submitMessage } from "@/domain/guestbook-message/actions/submit-message";
import { deleteMessage } from "@/domain/guestbook-message/actions/delete-message";
import { GUESTBOOK_ID } from "@/shared/constant";
import { useGetGuestbookMessage } from "@/domain/guestbook-message/hooks/use-get-guestbook-message";

const pageSize = 5;

export const GuestbookMessageView = () => {
  const [page, setPage] = useState(1);

  const {
    data: messages,
    total,
    isLoading,
    error,
    refetch,
  } = useGetGuestbookMessage({
    currentPage: page,
    pageSize,
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !password || !content)
      return alert("모든 항목을 입력해주세요.");

    if (content.length > 200) {
      return alert("메시지는 200자 이하로 입력해주세요.");
    }

    setLoading(true);
    const res = await submitMessage(name, content, password);
    if (res.success) {
      setName("");
      setPassword("");
      setContent("");
      setPage(1);
      await refetch();
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

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

  const totalPages = Math.ceil(total / pageSize) || 1;

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
              {messages.map((msg) => (
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
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
            >
              {loading ? "전송 중..." : "방명록 남기기"}
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
