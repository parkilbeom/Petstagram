import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  children: React.ReactNode;
}
export interface ModalSelectorState {
  modal: { children: React.ReactNode };
}
const initialState: ModalState = {
  children: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state, action) {
      state.children = action.payload;
    },
  },
});

const counterReduce = modalSlice.reducer;

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
