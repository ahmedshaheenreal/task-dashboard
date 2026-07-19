import { create } from "zustand";
import { DATA_SIZE, ITEMS_PER_PAGE } from "../constants";

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
  itemsPerPage: number;
  page: number;
  // Actions
  refreshAssets: () => void;
  refreshAssetById: (id: string) => void;
  setPage: (page: number) => void;
  fetchMarkets: () => Promise<void>;
  setSelectedAsset: (asset: CoinData | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredAndPaginatedAssets: () => {
    filteredPaginatedItems: CoinData[];
    totalPages: number;
  };
}

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

export const useMarketStore = create<MarketState>((set, get) => ({
  assets: [],
  selectedAsset: null,
  searchQuery: "",
  isLoading: false,
  error: null,
  page: 1,
  itemsPerPage: ITEMS_PER_PAGE,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPage: (page) => set({ page }),
  refreshAssets: () => {
    const { fetchMarkets } = get();
    fetchMarkets();
  },
  refreshAssetById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(
        `${API_URL}&ids=${id}`,
      );
      const data = await response.json();
      if (data.length > 0)
        set((state) => ({
          assets: state.assets.map((coin) => coin.id === id ? data[0] : coin),
          selectedAsset: data[0],
        }));

    } catch (error) {
      console.error("Error refreshing asset by ID", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMarkets: async () => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `${API_URL}&order=market_cap_desc&per_page=${DATA_SIZE}`,
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

  // High-performance Selector Engine
  getFilteredAndPaginatedAssets: () => {
    const { assets, searchQuery, page, itemsPerPage } = get();

    // Step A: Multi-property matching filter (ID, Name, or Ticker Symbol)
    const filtered = assets.filter((coin) => {
      const query = searchQuery.toLowerCase().trim();
      return (
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      );
    });

    //   pagination windows
    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const filteredPaginatedItems =
      searchQuery.trim() === ""
        ? assets.slice(startIndex, startIndex + itemsPerPage)
        : filtered.slice(startIndex, startIndex + itemsPerPage);

    return {
      filteredPaginatedItems,
      totalPages,
    };
  },
}));
