"use server";

import { createClient } from "@/lib/supabase/server";
import { GuestbookMessage } from "../schema";

type FetchRepliesSuccessResponse = {
  success: true;
  message: string;
  data: Pick<
    GuestbookMessage,
    "id" | "name" | "message" | "created_at" | "parent_id"
  >[];
  total: number;
};

type FetchRepliesErrorResponse = {
  success: false;
  message: string;
};

export type FetchRepliesResponse =
  | FetchRepliesSuccessResponse
  | FetchRepliesErrorResponse;

export async function fetchReplies(
  parentId: string,
  page: number = 1,
  pageSize: number = 5
): Promise<FetchRepliesResponse> {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("guestbook_messages")
    .select("id, name, message, created_at, parent_id")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error) {
    return {
      success: false,
      message: "대댓글 조회에 실패했습니다.",
    } as const;
  }

  return {
    success: true,
    message: "대댓글 조회에 성공했습니다.",
    data,
    total: count || 0,
  } as const;
}
