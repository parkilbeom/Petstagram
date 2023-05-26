import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import rootReducer from "@/modules";
import userUidReduce from "./userUid";
import counterReduce from "./counter";
import postUploadModalSlice from "./postUploadModal";
import userDataReduce from "./userData";
import postUploaderSlice from "./postImageUploader";

const rootReducer = combineReducers({
  userData: userDataReduce,
  userUid: userUidReduce,
  counter: counterReduce,
  postUploadModalSlice: postUploadModalSlice.reducer,
  postUploaderSlice: postUploaderSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
