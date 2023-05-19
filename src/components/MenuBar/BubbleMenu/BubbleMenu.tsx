import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { auth } from '@/firebase/app';
import { useRouter } from 'next/router';

import settings from '@/public/icons/MenuBar/Bubble/settings.png';
import bookMark from '@/public/icons/MenuBar/Bubble/bookMark.png';
import lightMode from '@/public/icons/MenuBar/Bubble/lightMode.png';
import { getColor } from '@/theme/utils';

export function BubbleMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('Successfully logged out');
      // 로그아웃 -> 로그인 페이지로 이동
      router.push('login');
    } catch (error) {
      console.error('Error occurred while logging out', error);
    }
  };

  return (
    <BubbleContainer>
      <h3 className='a11y-hidden'>더보기 메뉴</h3>
      <FirstLink href='setting'>
        <BubbleIcon src={settings} alt='설정' /> 설정
      </FirstLink>
      <BubbleLink href='main'>
        <BubbleIcon src={bookMark} alt='저장됨' /> 저장됨
      </BubbleLink>
      <BubbleLink as='button'>
        <BubbleIcon src={lightMode} alt='모드전환' /> 모드전환
      </BubbleLink>
      <LogoutButton as='button' type='submit' onClick={handleLogout}>
        로그아웃
      </LogoutButton>
    </BubbleContainer>
  );
}

const BubbleContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 243px;
  position: relative;
  top: 30px;

  :after {
    content: '';
    position: absolute;
    border-top: 15px solid ${getColor('primary color')};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    top: 205px;
    left: 30px;
  }
`;

const BubbleLink = styled(Link)`
  all: unset;
  cursor: pointer;
  padding: 12px 0 12px 23px;
  background-color: ${getColor('primary color')};
  color: #ffffff;
  display: flex;
  align-items: center;
`;

const BubbleIcon = styled(Image)`
  margin-right: 22px;
`;

const FirstLink = styled(BubbleLink)`
  border-radius: 15px 15px 0px 0px;
`;

const LogoutButton = styled(BubbleLink)`
  border-top: 1px solid white;
  border-radius: 0px 0px 15px 15px;
  padding: 16px 0 16px 23px;
`;
