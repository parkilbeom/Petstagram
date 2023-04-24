// 임시 네비게이션입니다!

import Link from "next/link";
import styled from "styled-components";

export default function Navigate() {
  return (
    <Div>
      <Link href="/">홈</Link>
      <Link href="/login">로그인</Link>
      <Link href="/register">회원가입</Link>
      <Link href="/test">모달테스트페이지</Link>
    </Div>
  );
}

const Div = styled.div`
  margin-top: 20px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
  a {
    display: block;
  }
`;
