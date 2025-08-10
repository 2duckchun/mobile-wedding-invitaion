// app/(or src)/domain/guestbook-message/actions/submit-message.ts
"use server";

import { hashPassword } from "@/lib/hash-password";
import { createClient } from "@/lib/supabase/server";

export async function submitMessage(
  name: string,
  message: string,
  password: string,
  parentId?: string | null // ✅ 추가
) {
  const supabase = await createClient();
  const password_hash = hashPassword(password);

  const { error } = await supabase.from("guestbook_messages").insert([
    {
      name,
      message,
      password_hash,
      parent_id: parentId ?? null, // ✅ 최상위는 null, 대댓글은 부모 id
    },
  ]);

  if (error) {
    return {
      success: false,
      message: "메시지 전송에 실패했습니다.",
    } as const;
  }

  return {
    success: true,
    message: "메시지 전송에 성공했습니다.",
  } as const;
}
