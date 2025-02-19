import { create } from 'zustand';

interface PaymentModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const usePaymentModal = create<PaymentModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default usePaymentModal;
