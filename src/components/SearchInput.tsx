import { useMarketStore } from "../store/useMarketStore.store";

function SearchInput() {
  const { searchQuery, setSearchQuery } = useMarketStore();
  return (
    <input
      id="search-input"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      className="bg-surface-container  mr-4 p-1 text-on-surface-container placeholder:text-outline-variant border border-outline-variant focus:outline-none focus:ring-2 focus:ring-terteiary"
      placeholder="Search..."
    />
  );
}

export default SearchInput;
