import styled from 'styled-components';
import { UserList } from '@/components';

type UserListProps = {
  profile: { email: string; profile_url: string; nickname: string };
};

export function FollowList({ profile }: UserListProps) {
  return (
    <ListBox>
      <UserList profile={profile} />
      <button>팔로우</button>
    </ListBox>
  );
}

const ListBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;
