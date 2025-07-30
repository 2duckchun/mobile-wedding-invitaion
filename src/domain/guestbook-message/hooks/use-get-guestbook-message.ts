import { useCallback, useEffect, useState } from "react";
import { fetchMessages } from "../actions/fetch-message";
import { GuestbookMessage } from "../schema";

type GetGuestBookMessage = {
  currentPage: number;
  pageSize: number;
};

export const useGetGuestbookMessage = ({
  currentPage,
  pageSize,
}: GetGuestBookMessage) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [messageList, setMessageList] = useState<
    Pick<GuestbookMessage, "id" | "name" | "message" | "created_at">[]
  >([]);
  const [total, setTotal] = useState(0);

  const loadMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetchMessages(currentPage, pageSize);
      if (res.success) {
        setMessageList(res.data);
        setTotal(res.total);
      } else {
        setError(new Error(res.message));
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    loadMessages();
  }, [currentPage, pageSize, loadMessages]);

  return {
    data: messageList,
    total,
    isLoading,
    error,
    refetch: loadMessages,
  };
};
