import { create } from 'zustand';

export type SearchQuery = {
  country: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  category: string;
};

interface SearchModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  query: SearchQuery;
  setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  query: {
    country: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
    bathrooms: 0,
    bedrooms: 0,
    category: '',
  },
  setQuery: (query: SearchQuery) => set({ query: query }),
}));

export default useSearchModal;
