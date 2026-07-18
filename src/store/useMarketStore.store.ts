import { create } from "zustand";

// 1. Precise TypeScript definition mapping exactly what CoinGecko returns
export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  market_cap_rank: number;
  last_updated: string;
}

interface MarketState {
  assets: CoinData[];
  selectedAsset: CoinData | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  page: number; // Added page state for pagination
  // Actions
  setPage: (page: number) => void;
  fetchMarkets: () => Promise<void>;
  setSelectedAsset: (asset: CoinData | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useMarketStore = create<MarketState>((set, get) => ({
  assets: [],
  selectedAsset: null,
  searchQuery: "",
  isLoading: false,
  error: null,
  page: 1,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setPage: (page) => set({ page }),

  fetchMarkets: async () => {
    // Prevent overlapping requests if a fetch is already running
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const currentPage = get().page;
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${currentPage}`,
      );

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - Rate limit or invalid request.`,
        );
      }

      const data: CoinData[] = await response.json();

      set({ assets: data, isLoading: false });

      // Smart UX Polish: Keep the details panel updated if the selected item refreshes
      const currentSelection = get().selectedAsset;
      if (currentSelection) {
        const updatedSelection = data.find((c) => c.id === currentSelection.id);
        if (updatedSelection) {
          set({ selectedAsset: updatedSelection });
        }
      }
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", isLoading: false });
    }
  },
}));
