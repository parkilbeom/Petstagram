import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import baseProfile from '@/public/profile.jpg';
import { getColor } from '@/theme/utils';

type UserProfileProps = {
  profile: { email: string; profile_url: string; paragraph: string };
  width?: string;
  height?: string;
  fontSize?: string;
  paragraphColor?: string;
};

export function UserList({
  profile,
  width = '60px',
  height = '60px',
  fontSize = '12px',
  paragraphColor = 'black',
}: UserProfileProps) {
  const user_id = profile.email.split('@')[0];
  return (
    <ListBox>
      <ProfileButton width={width} height={height}>
        {profile.profile_url === '' ? (
          <StyledImage
            src={baseProfile}
            alt='프로필 사진'
            width={100}
            height={100}
          />
        ) : (
          <img src={profile.profile_url} alt={profile.paragraph} />
        )}
      </ProfileButton>
      <ProfileBox>
        <LinkStyle href='/main' passHref fontSize={fontSize}>
          <IdLink>{user_id}</IdLink>
        </LinkStyle>
        <Name color={paragraphColor}>{profile.paragraph}</Name>
      </ProfileBox>
    </ListBox>
  );
}

const ListBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const ProfileButton = styled.button<{ width: string; height: string }>`
  all: unset;
  cursor: pointer;
  border-radius: 50%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-right: 22px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  gap: 2px;
`;

const LinkStyle = styled(Link)<{ fontSize: string }>`
  display: inline;
  text-decoration: none;
  color: black;
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
`;

const IdLink = styled.a``;

const Name = styled.p<{ color: string }>`
  width: 100%;
  font-size: 10px;
  color: ${(props) => props.color};
`;
