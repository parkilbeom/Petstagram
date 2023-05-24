import styled from 'styled-components';
import { UserList } from '@/components';
import { getColor } from '@/theme/utils';

type UserProfileProps = {
  profile: { email: string; profile_url: string; paragraph: string };
};

export function FollowList({ profile }: UserProfileProps) {
  return (
    <ListBox>
      <UserList
        profile={profile}
        width='30px'
        height='30px'
        fontSize='10px'
        paragraphColor={getColor('Grey/grey-600')}
      />
      <FollowButton>팔로우</FollowButton>
    </ListBox>
  );
}

const ListBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 279px;
  align-items: center;
  margin-bottom: 14px;
`;

const FollowButton = styled.button`
  all: unset;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  color: ${getColor('point color')};
`;
