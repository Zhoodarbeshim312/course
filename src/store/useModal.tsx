// import { create } from "zustand";

// interface ModalState {
//   modalBool: boolean;
//   openModal: () => void;
//   closeModal: () => void;
// }

// export const useModal = create<ModalState>((set) => ({
//   modalBool: false,
//   openModal: () => set({ modalBool: true  }),
//   closeModal: () => set({ modalBool: false }),
// }));
import { create } from "zustand";

interface ModalState {
  modalBool: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LOCAL_STORAGE_KEY = "modalBool";

export const useModal = create<ModalState>((set) => {
  const savedModalBool =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY) === "true"
      : false;

  return {
    modalBool: savedModalBool,
    openModal: () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      set({ modalBool: true });
    },
    closeModal: () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "false");
      set({ modalBool: false });
    },
  };
});
