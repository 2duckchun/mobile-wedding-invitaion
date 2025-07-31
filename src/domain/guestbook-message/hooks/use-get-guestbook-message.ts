import { useQuery } from "@/shared/hooks/use-query";
import { fetchMessages } from "../actions/fetch-message";

export const useGetGuestbookMessage = (
  currentPage: number,
  pageSize: number
) => {
  const {
    data: messages,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [currentPage, pageSize],
    queryFn: async () => {
      const res = await fetchMessages(currentPage, pageSize);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    initialData: { data: [], total: 0, success: true, message: "" },
  });

  const totalPages = Math.ceil((messages?.total || 0) / pageSize) || 1;
  return {
    messages,
    isLoading,
    error,
    refetch,
    totalPages,
  };
};
