"use server";

import { createClient } from "@/lib/supabase/server";
import { GuestbookMessage } from "../schema";

type FetchMessageSuccessResponse = {
  success: true;
  message: string;
  data: Pick<GuestbookMessage, "id" | "name" | "message" | "created_at">[];
  total: number;
};

type FetchMessageErrorResponse = {
  success: false;
  message: string;
};

type FetchMessageResponse =
  | FetchMessageSuccessResponse
  | FetchMessageErrorResponse;

export async function fetchMessages(
  page: number = 1,
  pageSize: number = 5
): Promise<FetchMessageResponse> {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("guestbook_messages")
    .select("id, name, message, created_at", { count: "exact" })
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return {
      success: false,
      message: "메시지 조회에 실패했습니다.",
    } as const;
  }

  return {
    success: true,
    message: "메시지 조회에 성공했습니다.",
    data,
    total: count || 0,
  } as const;
}
