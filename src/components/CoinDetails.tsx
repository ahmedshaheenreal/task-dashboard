import { useMarketStore, type CoinData } from "../store/useMarketStore.store";
import DummyButtons from "./DummyButtons";
import TimeStampState from "./TimeStampState";

function CoinDetails() {
  const { selectedAsset }: { selectedAsset: CoinData | null } =
    useMarketStore();
  return (
    <div className="mt-4 w-[90%] mx-auto border border-outline-variant rounded-xl   flex flex-col  border-t-[#374151]">
      <div className="p-6 border-b border-outline-variant flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#F7931A]/10 text-[#F7931A] flex items-center justify-center border border-[#F7931A]/30 shrink-0">
          <span className=" text-[24px]">
            <img
              src={
                selectedAsset?.image ||
                "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              }
              alt="Bitcoin"
            />
          </span>
        </div>
        <div>
          <h3 className="font-headline-lg text-headline-lg text-label m-0 leading-tight">
            {selectedAsset?.name || "Bitcoin"}
          </h3>
          <p className="font-body-sm text-body-sm text-label uppercase tracking-wider">
            {selectedAsset?.symbol?.toUpperCase() || "BTC"}
          </p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="  text-on-surface-variant mb-1 uppercase">
            Current Price
          </p>
          <div className="flex   gap-2">
            <span className="  text-lg    ">
              $ {selectedAsset?.current_price?.toFixed(2) || "0.00"}
            </span>
            <span className="  text-sm text-primary  bg-primary/10 px-2 py-1 rounded-DEFAULT border border-primary/20">
              +
              {selectedAsset?.price_change_percentage_24h?.toFixed(2) || "0.00"}
              %
            </span>
          </div>
        </div>
        {/*   Grid for Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
            <p className=" font-bold    text-on-surface-variant mb-2 uppercase">
              24h High
            </p>
            <p className=" text-xs text-on-surface">
              $ {selectedAsset?.high_24h?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
            <p className=" font-bold  text-on-surface-variant mb-2 uppercase">
              24h Low
            </p>
            <p className="  text-xs text-on-surface">
              $ {selectedAsset?.low_24h?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
            <p className=" font-bold  text-on-surface-variant mb-2 uppercase">
              Total Volume
            </p>
            <p className="font-data-md text-data-md text-on-surface">
              {selectedAsset?.total_volume
                ? `$${selectedAsset.total_volume.toLocaleString()}`
                : "0.00"}
            </p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
            <p className=" font-bold  text-on-surface-variant mb-2 uppercase">
              Market Rank
            </p>
            <p className="font-data-md text-data-md text-on-surface">
              {selectedAsset?.market_cap_rank
                ? `#${selectedAsset.market_cap_rank.toLocaleString()}`
                : "0 "}
            </p>
          </div>
        </div>
        {/* Actions (Optional filler for layout) */}
        <DummyButtons />
      </div>
      {/* Footer Timestamp */}
      <TimeStampState lastUpdated={selectedAsset?.last_updated || ""} />
    </div>
  );
}

export default CoinDetails;
