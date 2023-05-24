import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';
import { getColor } from '@/theme/utils';
import { useSelector } from 'react-redux';
import { userUidState, userDataState } from '@/types/index';
import { BubbleMenu } from '@/components';

import desktopLogo from '@/public/images/logo.svg';
import tabletLogo from '@/public/images/logo-tablet.svg';
import homeEmpty from '@/public/icons/MenuBar/home-empty.png';
import homeFill from '@/public/icons/MenuBar/home-fill.png';
import searchEmpty from '@/public/icons/MenuBar/search-empty.png';
import searchFill from '@/public/icons/MenuBar/search-fill.png';
import messageEmpty from '@/public/icons/MenuBar/message-empty.png';
import messageFill from '@/public/icons/MenuBar/message-fill.png';
import alertEmpty from '@/public/icons/MenuBar/alert-empty.png';
// import alertFill from '@/public/icons/MenuBar/alert-fill.png';
import postEmpty from '@/public/icons/MenuBar/post-empty.png';
// import postFill from '@/public/icons/MenuBar/post-fill.png';
import seeMore from '@/public/icons/MenuBar/menuBurger.png';

export function MenuBar() {
  const [isBubble, setIsBubble] = useState<boolean>(false);

  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  const handleBubble = () => {
    setIsBubble(!isBubble);
  };

  return (
    <>
      <DesktopMenuBar>
        <Logo>
          <LogoLink href='/main'>
            <Image src={desktopLogo} alt='펫스타그램'></Image>
          </LogoLink>
        </Logo>
        <h2 className='a11y-hidden'>메뉴바</h2>
        <Menu>
          <div>
            <MenuLink href='/main'>
              <MenuIcon src={homeEmpty} alt='홈'></MenuIcon>홈
            </MenuLink>
            <MenuLink as='button'>
              <MenuIcon src={searchEmpty} alt='검색'></MenuIcon>검색
            </MenuLink>
            <MenuLink href='/main'>
              <MenuIcon src={messageEmpty} alt='메세지'></MenuIcon>메세지
            </MenuLink>
            <MenuLink as='button'>
              <MenuIcon src={alertEmpty} alt='알림'></MenuIcon>알림
            </MenuLink>
            <MenuLink as='button'>
              <MenuIcon src={postEmpty} alt='만들기'></MenuIcon>만들기
            </MenuLink>
            <MenuLink href='/main'>
              <ProfileIcon
                src={userInfo.data.profile_url}
                alt='프로필'
                width={27}
                height={27}
                unoptimized
              ></ProfileIcon>
              프로필
            </MenuLink>
          </div>
          {isBubble ? <BubbleMenu /> : null}
          <SeeMoreButton as='button' onClick={handleBubble}>
            <MenuIcon src={seeMore} alt='더보기'></MenuIcon>더보기
          </SeeMoreButton>
        </Menu>
      </DesktopMenuBar>
      <TabletMenuBar>
        <TabletLogo>
          <LogoLink href='/main'>
            <Image src={tabletLogo} alt='펫스타그램'></Image>
          </LogoLink>
        </TabletLogo>
        <h2 className='a11y-hidden'>메뉴바</h2>
        <Menu>
          <div>
            <TabletMenuLink href='/main'>
              <TabletIcon src={homeEmpty} alt='홈'></TabletIcon>
            </TabletMenuLink>
            <TabletMenuLink as='button'>
              <TabletIcon src={searchEmpty} alt='검색'></TabletIcon>
            </TabletMenuLink>
            <TabletMenuLink href='/main'>
              <TabletIcon src={messageEmpty} alt='메세지'></TabletIcon>
            </TabletMenuLink>
            <TabletMenuLink as='button'>
              <TabletIcon src={alertEmpty} alt='알림'></TabletIcon>
            </TabletMenuLink>
            <TabletMenuLink as='button'>
              <TabletIcon src={postEmpty} alt='만들기'></TabletIcon>
            </TabletMenuLink>
            <TabletMenuLink href='/main'>
              <TabletProfileIcon
                src={userInfo.data.profile_url}
                alt='프로필'
                width={27}
                height={27}
                unoptimized
              ></TabletProfileIcon>
            </TabletMenuLink>
          </div>
          {isBubble ? <BubbleMenu /> : null}
          <SeeMoreButton as='button' onClick={handleBubble}>
            <TabletIcon src={seeMore} alt='더보기'></TabletIcon>
          </SeeMoreButton>
        </Menu>
      </TabletMenuBar>
      <MobileMenuBar>
        <h2 className='a11y-hidden'>메뉴바</h2>
        <MobileMenu>
          <TabletMenuLink href='/main'>
            <TabletIcon src={homeEmpty} alt='홈'></TabletIcon>
          </TabletMenuLink>
          <TabletMenuLink as='button'>
            <TabletIcon src={alertEmpty} alt='알림'></TabletIcon>
          </TabletMenuLink>
          <TabletMenuLink as='button'>
            <TabletIcon src={postEmpty} alt='만들기'></TabletIcon>
          </TabletMenuLink>
          <TabletMenuLink href='/main'>
            <TabletIcon src={messageEmpty} alt='메세지'></TabletIcon>
          </TabletMenuLink>
          <TabletMenuLink href='/main'>
            <TabletProfileIcon
              src={userInfo.data.profile_url}
              alt='프로필'
              width={27}
              height={27}
              unoptimized
            ></TabletProfileIcon>
          </TabletMenuLink>
        </MobileMenu>
      </MobileMenuBar>
    </>
  );
}

const DesktopMenuBar = styled.section`
  position: sticky;
  top: 0;
  width: 350px;
  height: 100vh;
  padding: 40px 30px 24.52px 30px;
  border-right: 1px solid ${getColor('Grey/grey-100')};
  z-index: 10;

  @media (max-width: 1919px) {
    width: 300px;
  }

  @media (max-width: 1460px) {
    display: none;
  }
`;

const TabletMenuBar = styled.section`
  position: sticky;
  top: 0;
  width: 55px;
  height: 100vh;
  padding: 40px 30px 24.52px 30px;
  border-right: 1px solid ${getColor('Grey/grey-100')};
  z-index: 10;

  @media (max-width: 768px) or (min-width: 1460px) {
    display: none;
  }
`;

const MobileMenuBar = styled.section`
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px 27.7px;
  border-right: 1px solid ${getColor('Grey/grey-100')};
  background-color: white;
  z-index: 10;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled.h1`
  margin-bottom: 35px;
`;

const TabletLogo = styled(Logo)`
  display: flex;
  justify-content: center;
`;

const LogoLink = styled(Link)`
  display: inline-block;
`;

const Menu = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 80%;
  justify-content: space-between;
`;

const MobileMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

const MenuLink = styled(Link)`
  all: unset;
  width: 96%;
  padding: 12px 0px 12px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;

  :hover {
    background-color: ${getColor('secondary color')};
  }
`;

const TabletMenuLink = styled(MenuLink)`
  width: 27px;
  padding-right: 12px;
  justify-content: center;
`;

const SeeMoreButton = styled(MenuLink)`
  margin-bottom: 0px;
`;

const TabletIcon = styled(Image)`
  width: 27px;
  height: 27px;
`;

const MenuIcon = styled(TabletIcon)`
  margin-right: 22px;
`;

const ProfileIcon = styled(MenuIcon)`
  border-radius: 50%;
`;

const TabletProfileIcon = styled(TabletIcon)`
  border-radius: 50%;
`;
