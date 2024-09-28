import { ReactNode } from 'react';
import { create } from 'zustand';

export interface ModalStoreState {
  modalStack: ReactNode[];
}

export interface ModalStoreAction {
  pushModal: (modal: ReactNode) => void;
  popModal: () => void;
  onCloseAll: () => void;
}

export const useModalStackStore = create<ModalStoreState & ModalStoreAction>(
  (set) => ({
    modalStack: [],

    pushModal: (modal) =>
      set((state) => ({
        modalStack: [...state.modalStack, modal],
      })),

    popModal: () =>
      set((state) => ({
        modalStack: state.modalStack.slice(0, -1),
      })),

    onCloseAll: () => set({ modalStack: [] }),
  }),
);
