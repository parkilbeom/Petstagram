import styled from "styled-components";
import { Article, Form } from "./register";
import Link from "next/link";

export default function Login() {
  return (
    <Article>
      <Form>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" placeholder="이메일" required />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호" required />

        <button type="submit">로그인</button>
      </Form>
      <Div>
        <p>계정이 없으신가요?</p>
        <Link href="/register">가입하기</Link>
      </Div>
    </Article>
  );
}

const Div = styled.div`
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  height: 104px;
  width: 100%;
  max-width: 398px;
  min-width: 320px;
  border: 1px solid black;
  display: flex;
  flex-flow: row;
`;
