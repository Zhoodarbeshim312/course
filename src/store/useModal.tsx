import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalState {
  modalBool: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>()(
  persist(
    (set) => ({
      modalBool: false,
      openModal: () => set({ modalBool: true }),
      closeModal: () => set({ modalBool: false }),
      
    }),
    {
      name: "modalBool", // ключ в localStorage
    }
  )
);
