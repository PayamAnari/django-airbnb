import { create } from 'zustand';

export type SearchQuery = {
  country: string | undefined;
  city: string | undefined;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  bed: number;
  category: string;
};

interface SearchModalStore {
  isOpen: boolean;
  step: string;
  open: (step: string) => void;
  close: () => void;
  query: SearchQuery;
  setQuery: (query: SearchQuery) => void;
  resetQuery: () => void; // Add this line
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  step: '',
  open: (step) => set({ isOpen: true, step: step }),
  close: () => set({ isOpen: false }),
  setQuery: (query: SearchQuery) => set({ query: query }),
  resetQuery: () => set({ // Add this method
    query: {
      country: '',
      city: '',
      checkIn: undefined,
      checkOut: undefined,
      guests: 1,
      bathrooms: 0,
      bedrooms: 0,
      bed: 0,
      category: '',
    },
  }),
  query: {
    country: '',
    city: '',
    checkIn: undefined,
    checkOut: undefined,
    guests: 1,
    bathrooms: 0,
    bedrooms: 0,
    bed: 0,
    category: '',
  },
}));

export default useSearchModal;
