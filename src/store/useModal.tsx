import { create } from "zustand";

interface ModalState {
  modalBool: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  modalBool: true,
  openModal: () => set({ modalBool: false }),
  closeModal: () => set({ modalBool: true }),
}));
