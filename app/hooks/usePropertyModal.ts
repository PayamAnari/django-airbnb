import { create } from 'zustand';

interfaceAddPropertyModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const usePropertyModal = create<AddPropertyModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default usePropertyModal;
