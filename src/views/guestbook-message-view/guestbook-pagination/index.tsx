import { Pagination } from "@/shared/ui/pagination";

type GuestbookPaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const GuestbookPagination = ({
  page,
  totalPages,
  setPage,
}: GuestbookPaginationProps) => {
  return (
    <div className="text-center">
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
