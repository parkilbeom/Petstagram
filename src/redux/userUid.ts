import { createSlice } from "@reduxjs/toolkit";
import firebase from "@/firebase/app";

interface userUidState {
  value: string;
}

const initialState: userUidState = {
  value: "0",
};

const userUidSlice = createSlice({
  name: "userUid",
  initialState,
  reducers: {
    login(state) {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        state.value = uid;
      } else {
        state.value == "로그아웃 상태";
      }
    },
  },
});

const userUidReduce = userUidSlice.reducer;

export const { login } = userUidSlice.actions;
export default userUidReduce;
