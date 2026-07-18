import { useMarketStore } from "../store/useMarketStore.store";

export function TablePagination() {
  const { page, setPage, isLoading } = useMarketStore();

  return (
    <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 bg-panel-bg rounded-b-lg mx-auto w-full">
      <div className="text-sm text-slate-400">
        Showing page <span className="font-medium text-slate-200">{page}</span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1 || isLoading}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={isLoading}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}
