import { createClient } from "@/utils/supabase/server";

export default async function TestPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("connect_table").select();
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
