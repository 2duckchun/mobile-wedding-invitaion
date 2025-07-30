import { useCallback, useEffect, useState } from "react";

type UseQueryOptions<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryKey: any[]; // 종속성 배열
  queryFn: () => Promise<T>;
  initialData?: T;
};

export const useQuery = <T>({
  queryKey,
  queryFn,
  initialData,
}: UseQueryOptions<T>) => {
  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, queryKey);

  return { data, isLoading, error, refetch };
};
