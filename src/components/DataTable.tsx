import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useMarketStore } from "../store/useMarketStore.store";
import { useEffect } from "react";
import { TablePagination } from "./TablePagination";
import { TrendingDown, TrendingUp } from "lucide-react";

function DataTable() {
  const {
    isLoading,
    fetchMarkets,
    selectedAsset,
    setSelectedAsset,
    page,
    getFilteredAndPaginatedAssets,
  } = useMarketStore();

  useEffect(() => {
    fetchMarkets();
  }, [page, fetchMarkets]);

  const { filteredPaginatedItems, totalPages } = getFilteredAndPaginatedAssets();

  return (
    <div className="flex flex-col h-full bg-transparent">
      <Table className="w-full text-left border-collapse relative">
        <TableHeader className="border-b border-white/10 sticky top-0 bg-[#0a0a14]/90 backdrop-blur-md z-10">
          <TableRow className="hover:bg-transparent border-white/5 [&>*]:text-muted-foreground [&>*]:font-medium">
            <TableHead className="w-[150px] pl-6 py-4">Asset Name</TableHead>
            <TableHead className="py-4 hidden sm:table-cell">Symbol</TableHead>
            <TableHead className="py-4">Price</TableHead>
            <TableHead className="text-center py-4 hidden sm:table-cell">24h Change</TableHead>
            <TableHead className="text-right pr-6 py-4 hidden md:table-cell">Volume</TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center h-64 text-muted-foreground">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p>Loading market data...</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody className="text-white border-separate border-spacing-0">
            {filteredPaginatedItems.map((asset) => (
              <TableRow
                key={asset.id}
                className={`transition-all duration-200 cursor-pointer border-b border-white/5 ${selectedAsset?.id === asset.id
                  ? "bg-primary/10 border-l-2 border-l-primary"
                  : "hover:bg-white/5 border-l-2 border-l-transparent"
                  }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <TableCell className="font-medium pl-4 sm:pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full shadow-sm" />
                    <span className="font-semibold">{asset.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm uppercase py-4 hidden sm:table-cell">
                  {asset.symbol}
                </TableCell>
                <TableCell className="font-medium py-4">
                  ${asset.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}

                  <div className={`text-xs mt-1 sm:hidden ${asset.price_change_percentage_24h < 0 ? "text-red-400" : "text-green-400"}`}>
                    {asset.price_change_percentage_24h < 0 ? "" : "+"}{(asset.price_change_percentage_24h || 0).toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell className="text-center py-4 hidden sm:table-cell">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${asset.price_change_percentage_24h < 0
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-green-500/10 text-green-400 border border-green-500/20"
                        }`}
                    >
                      {asset.price_change_percentage_24h < 0 ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : (
                        <TrendingUp className="w-3 h-3" />
                      )}
                      {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-6 py-4 font-mono text-sm text-muted-foreground hidden md:table-cell">
                  ${asset.total_volume.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      <div className="mt-auto border-t border-white/10 bg-white/5 px-6 py-4 flex items-center justify-center shrink-0">
        <TablePagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default DataTable;
