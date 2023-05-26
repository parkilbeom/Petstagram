import { createSlice } from "@reduxjs/toolkit";
import firebase from "@/firebase/app";

export interface PostUploadModalState {
  isOpen: boolean;
  curContentIndex: number;
  nextBtnActived: boolean;
  prevBtnActived: boolean;
}

const initialState: PostUploadModalState = {
  isOpen: false,
  curContentIndex: 0,
  nextBtnActived: false,
  prevBtnActived: false,
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
      if (state.curContentIndex + action.payload >= 0 && state.curContentIndex + action.payload <= 1) {
        console.log("state.curContentIndex + action.payload", state.curContentIndex + action.payload);

        state.curContentIndex = state.curContentIndex + action.payload;
      }
    },
    setNextBtnActive: (state, action) => {
      state.nextBtnActived = action.payload;
    },
    setPrevBtnActive: (state, action) => {
      state.prevBtnActived = action.payload;
    },
  },
});

export const { open, close, addCurContentIndex, setNextBtnActive, setPrevBtnActive } = postUploadModalSlice.actions;
export default postUploadModalSlice;
