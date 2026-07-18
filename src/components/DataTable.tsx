import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useMarketStore } from "../store/useMarketStore.store";
import { useEffect } from "react";
import { TablePagination } from "./TablePagination";
function DataTable() {
  const {
    assets,
    isLoading,
    fetchMarkets,
    selectedAsset,
    setSelectedAsset,
    page,
  } = useMarketStore();
  useEffect(() => {
    fetchMarkets();
  }, [page]); // Fetch markets whenever the page changes

  return (
    <Table className="w-full bg-background text-left border-collapse mt-4">
      <TableCaption className="text-white  h-full border-b border-outline-variant">
        Current Market Overview of Top 5 Cryptocurrencies by Market Cap
      </TableCaption>
      <TableHeader className="   font-jetbrains text-sm border-b border-outline-variant">
        <TableRow className="[&>*]:text-[#bbcabf]">
          <TableHead className="w-[100px]  ">Name</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Current Price</TableHead>
          <TableHead className="text-right ">24h Change %</TableHead>
          <TableHead className="text-left ">24h Volume</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading && (
        <TableBody className="text-white  border-separate border-spacing-0 h-full">
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      {!isLoading && (
        <TableBody className="text-white  border-separate border-spacing-0">
          {assets.map((asset) => (
            <TableRow
              key={asset.id}
              className={
                selectedAsset?.id === asset.id
                  ? "bg-primary/10 border-l-primary/80 border-l-4"
                  : ""
              }
              onClick={() => setSelectedAsset(asset)}
            >
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell className="font-jetbrains text-sm text-[#bbcabf]">
                {asset.symbol.toUpperCase()}
              </TableCell>
              <TableCell>{asset.current_price.toFixed(2)}</TableCell>
              <TableCell
                className={`text-right ${asset.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}
              >
                <span
                  className={`inline-flex items-center gap-1   px-2 py-0.5 rounded-full font-data-sm text-data-sm border${asset.price_change_percentage_24h < 0 ? " bg-red-500/10 border-red-500/20 text-red-500" : " bg-green-500/10 border-green-500/20 text-green-500"} `}
                >
                  {`${asset.price_change_percentage_24h < 0 ? "-" : "+"}${Math.abs(asset.price_change_percentage_24h).toFixed(2)}%`}
                </span>
              </TableCell>
              <TableCell className="text-left">
                {asset.total_volume.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
      <TableFooter className="bg-surface-container  ">
        <TableRow className="bg-surface  text-white  border-t border-outline-variant">
          <TableCell colSpan={5} className="text-center">
            <TablePagination />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default DataTable;
