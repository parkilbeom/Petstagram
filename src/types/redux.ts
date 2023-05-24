import { User } from '@/components/InfiniteScroll/postList';

export interface userUidState {
  userUid: { value: string };
}

export interface userDataState {
  userData: {
    isLoading: boolean;
    error: boolean;
    data: User;
  };
}
