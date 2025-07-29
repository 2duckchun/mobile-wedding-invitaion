"use server";

import { createClient } from "@/utils/supabase/server";
import { hashPassword } from "@/utils/hash-password";

export async function deleteMessage(id: string, password: string) {
  const supabase = await createClient();
  const password_hash = hashPassword(password);

  const { data, error, count } = await supabase
    .from("guestbook_messages")
    .delete()
    .eq("id", id)
    .eq("password_hash", password_hash)
    .select("*");

  if (error) {
    return {
      success: false,
      message: "메시지 삭제에 실패했습니다.",
    } as const;
  }

  if (!error && (!Array.isArray(data) || data.length === 0)) {
    return {
      success: false,
      message: "비밀번호가 일치하지 않거나 메시지를 찾을 수 없습니다.",
    } as const;
  }

  if (count === 0) {
    return {
      success: false,
      message: "비밀번호가 일치하지 않거나 메시지를 찾을 수 없습니다.",
    } as const;
  }

  return {
    success: true,
    message: "메시지 삭제에 성공했습니다.",
  } as const;
}
