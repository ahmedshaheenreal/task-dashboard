import { useMarketStore } from "../store/useMarketStore.store";
import DummyButtons from "./DummyButtons";
import TimeStampState from "./TimeStampState";
import { TrendingUp, TrendingDown, Activity, BarChart3, Hash, RefreshCcwIcon } from "lucide-react";

function CoinDetails() {
  const { selectedAsset, refreshAssetById, isLoading } = useMarketStore();

  if (!selectedAsset) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <Activity className="w-10 h-10 text-white/40" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Asset Selected</h3>
        <p className="text-sm max-w-[250px]">Select a cryptocurrency from the table to view its detailed market statistics.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-transparent relative w-full">
      <div className="p-6 border-b border-white/10 flex items-center gap-5 shrink-0 bg-white/5 backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 p-2 shadow-lg group">
          <img
            src={selectedAsset.image}
            alt={selectedAsset.name}
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div>
          <button
            disabled={isLoading}
            onClick={() => refreshAssetById(selectedAsset.id + "")}
            className="w-10 h-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
          >
            <RefreshCcwIcon className="w-5 h-5 text-white" />
          </button>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
              {selectedAsset.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-white/10 text-muted-foreground border border-white/5">
                {selectedAsset.symbol}
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-colors">
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-medium">Current Price</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white tracking-tight">
                ${selectedAsset.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold shadow-inner ${selectedAsset.price_change_percentage_24h < 0
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : "bg-green-500/10 text-green-400 border border-green-500/20"
                }`}
            >
              {selectedAsset.price_change_percentage_24h < 0 ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
              {Math.abs(selectedAsset.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Grid for Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">24h High</p>
            </div>
            <p className="text-lg font-mono text-white truncate">
              ${selectedAsset.high_24h?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) || "0.00"}
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">24h Low</p>
            </div>
            <p className="text-lg font-mono text-white truncate">
              ${selectedAsset.low_24h?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) || "0.00"}
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Volume</p>
            </div>
            <p className="text-lg font-mono text-white truncate">
              {selectedAsset.total_volume ? `$${selectedAsset.total_volume.toLocaleString()}` : "0"}
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Market Rank</p>
            </div>
            <p className="text-lg font-mono text-white truncate">
              {selectedAsset.market_cap_rank ? `#${selectedAsset.market_cap_rank.toLocaleString()}` : "N/A"}
            </p>
          </div>
        </div>


        <div className="mt-auto pt-4">
          <DummyButtons />
        </div>
      </div>


      <div className="mt-auto border-t border-white/10 bg-white/5 p-4 shrink-0 flex justify-center text-xs text-muted-foreground">
        <TimeStampState lastUpdated={selectedAsset.last_updated || ""} />
      </div>
    </div>
  );
}

export default CoinDetails;
