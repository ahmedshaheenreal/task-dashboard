import { useMarketStore } from "../store/useMarketStore.store";

function SearchInput() {
  const {
    searchQuery,
    setSearchQuery,
    getFilteredAndPaginatedAssets,
    setPage,
  } = useMarketStore();
  return (
    <input
      id="search-input"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setPage(1); // Reset to the first page whenever the search query changes
        getFilteredAndPaginatedAssets();
        console.log("Filtered and Paginated Assets Updated"); // Call the function to update the filtered and paginated assets
      }}
      className="bg-surface-container  mr-4 p-1 text-on-surface-container placeholder:text-outline-variant border border-outline-variant focus:outline-none focus:ring-2 focus:ring-terteiary"
      placeholder="Search..."
    />
  );
}

export default SearchInput;
