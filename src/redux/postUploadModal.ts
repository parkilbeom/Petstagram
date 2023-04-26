import { createSlice } from "@reduxjs/toolkit";
import firebase from "@/firebase/app";

export interface PostUploadModalState {
  isOpen: boolean;
  curContentIndex: number;
}

const initialState: PostUploadModalState = {
  isOpen: false,
  curContentIndex: 0,
};

const postUploadModalSlice = createSlice({
  name: "PostUploadModal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    addCurContentIndex: (state, action) => {
      state.curContentIndex = state.curContentIndex + action.payload;
    },
  },
});

export const { open, close, addCurContentIndex } = postUploadModalSlice.actions;
export default postUploadModalSlice;
