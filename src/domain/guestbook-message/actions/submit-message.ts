"use server";

import { hashPassword } from "@/lib/hash-password";
import { createClient } from "@/lib/supabase/server";

export async function submitMessage(
  name: string,
  message: string,
  password: string
) {
  const supabase = await createClient();
  const password_hash = hashPassword(password);

  const { error } = await supabase
    .from("guestbook_messages")
    .insert([{ name, message, password_hash }]);

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
