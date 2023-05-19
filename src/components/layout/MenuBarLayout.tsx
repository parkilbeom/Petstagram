import { MenuBar } from '@/components';
import { ReactNode } from 'react';
import styled from 'styled-components';

// 메뉴바 있는 버전 레이아웃
export function MenuBarLayout(props: { children: ReactNode }) {
  return (
    <Wrapper>
      <MenuBar />
      {props.children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
