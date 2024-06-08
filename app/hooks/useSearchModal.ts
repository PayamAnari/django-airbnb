import { create } from 'zustand';

export type SearchQuery = {
  country: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  category: string;
};

interface SearchModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSearchModal;
