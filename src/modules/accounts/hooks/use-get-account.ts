import { create } from 'zustand'

type GetAccountState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useGetAccount = create<GetAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))