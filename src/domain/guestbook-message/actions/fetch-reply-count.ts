"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchReplyCount(parentId: string) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("guestbook_messages")
    .select("*", { count: "exact", head: true })
    .eq("parent_id", parentId);

  if (error) {
    return { success: false as const, message: "답글 수 조회 실패", total: 0 };
  }
  return { success: true as const, message: "ok", total: count ?? 0 };
}
