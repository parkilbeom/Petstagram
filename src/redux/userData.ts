import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';

type userDataType = {
  isLoading: boolean;
  error: boolean;
  data: User;
};

const initialState: userDataType = {
  isLoading: true,
  error: false,
  data: {
    name: '',
    nickname: '',
    email: '',
    post_uid: [],
    introduce: '',
    profile_url: '',
    phone: '',
    followers: [],
    following: [],
    scrap: [],
  },
};

// createAsyncThunk: 비동기 작업을 처리해주는 action을 만들어줌
const getUserData = createAsyncThunk('user/data', async (uid: string) => {
  const userData = (await getData('users', uid)) as User;
  return userData;
});

const userDataSlice = createSlice({
  name: 'userdata',
  initialState,
  // reducer: action creator를 toolkit이 자동으로 만들어줌
  reducers: {},
  // extraReducers: 비동기 작업은 action creator를 자동으로 만들어주지 않음 -> 여기에 정의
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state: userDataType) => {
      state.isLoading = true;
    });
    builder.addCase(getUserData.fulfilled, (state: userDataType, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserData.rejected, (state: userDataType) => {
      state.error = true;
    });
  },
});

const userDataReduce = userDataSlice.reducer;

// export const {} = userDataSlice.actions;
export { getUserData };
export default userDataReduce;
