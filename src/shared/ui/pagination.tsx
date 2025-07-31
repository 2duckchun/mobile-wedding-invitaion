type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  maxPageButtons?: number;
};

export const Pagination = ({
  page,
  totalPages,
  setPage,
  maxPageButtons = 5,
}: PaginationProps) => {
  const startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="text-center">
      <div className="inline-flex gap-1 mt-2 flex-wrap justify-center">
        {/* << 처음으로 */}
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-2 py-1 border rounded text-sm disabled:opacity-40"
        >
          ≪
        </button>
        {/* < 이전 */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 border rounded text-sm disabled:opacity-40"
        >
          ＜
        </button>

        {/* 숫자 페이지들 */}
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 border rounded text-sm ${
              num === page ? "bg-pink-500/70 text-white font-bold" : "bg-white"
            }`}
          >
            {num}
          </button>
        ))}

        {/* > 다음 */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 border rounded text-sm disabled:opacity-40"
        >
          ＞
        </button>
        {/* >> 마지막으로 */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-2 py-1 border rounded text-sm disabled:opacity-40"
        >
          ≫
        </button>
      </div>
    </div>
  );
};
