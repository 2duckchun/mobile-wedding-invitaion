import { useQuery } from "@/shared/hooks/use-query";
import { fetchReplyCount } from "../actions/fetch-reply-count";

export function useGetReplyCount(parentId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reply-count", parentId],
    queryFn: async () => {
      const res = await fetchReplyCount(parentId);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    initialData: { success: true, message: "", total: 0 },
  });

  return {
    total: data?.total ?? 0,
    isLoading,
    error,
    refetch,
  };
}
