import { useMarketStore } from "../store/useMarketStore.store";
import { Search } from "lucide-react";

function SearchInput() {
  const {
    searchQuery,
    setSearchQuery,
    getFilteredAndPaginatedAssets,
    setPage,
  } = useMarketStore();
  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-primary transition-colors" />
      <input
        id="search-input"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1);
          getFilteredAndPaginatedAssets();
        }}
        className="bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all w-48 sm:w-64"
        placeholder="Search assets..."
      />
    </div>
  );
}

export default SearchInput;
