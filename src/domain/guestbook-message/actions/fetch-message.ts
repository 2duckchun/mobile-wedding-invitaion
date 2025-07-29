"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchMessages(page: number = 1, pageSize: number = 5) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("guestbook_messages")
    .select("id, name, message, created_at", { count: "exact" })
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
    total: count,
  } as const;
}

// "use server";

// import { createClient } from "@/utils/supabase/server";

// export async function fetchMessages() {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("guestbook_messages")
//     .select("id, name, message, created_at")
//     .order("created_at", { ascending: false });

//   if (error) {
//     return {
//       success: false,
//       message: "메시지 조회에 실패했습니다.",
//     } as const;
//   }

//   return {
//     success: true,
//     message: "메시지 조회에 성공했습니다.",
//     data,
//   } as const;
// }
