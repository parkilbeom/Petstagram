import React, { useState } from "react";
import firebase, { auth } from "@/firebase/app";
import "firebase/auth";
import styled from "styled-components";
import { Article } from "./register";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setError(false);
        setMessage("비밀번호 재설정 이메일이 전송되었습니다.");
      })
      .catch((error) => {
        setError(true);
        setMessage(`아이디를 확인해주세요.`);
      });
  };

  return (
    <Article>
      <Div>
        <h1>아이콘</h1>
        <h2>로그인에 문제가 있나요?</h2>
        <p>
          이메일 주소을 입력 하시면 <br />
          계정에 다시 액세스할 수 있는 링크를 보 내드립니다.
        </p>
        <Message isError={error ? true : false}>{message}</Message>
        <form onSubmit={handleSubmit}>
          <label>
            이메일:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">로그인 링크 보내기</button>
        </form>
        <Link href="/register">새 계정 만들기</Link>
      </Div>
      <LoginSpan>
        <Link className="loginLink" href="/login">
          로그인으로 돌아가기
        </Link>
      </LoginSpan>
    </Article>
  );
};
type MessageProps = {
  isError: boolean;
};

const LoginSpan = styled.span`
  width: 398px;
  height: 38px;

  .loginLink {
    justify-content: center;
    align-items: center;
    background: #bdbdbd;
    display: flex;
    height: 100%;
    width: 100%;
  }
`;
const Message = styled.p<MessageProps>`
  color: ${(props) => (props.isError ? "#ff0000" : "black")};
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
`;
const Div = styled.div`
  form {
    gap: 12px;
    display: flex;
    flex-flow: column;
  }
  gap: 12px;
  text-align: center;
  border: 1px solid black;
  width: 100%;
  max-width: 398px;
  min-width: 320px;
  display: flex;
  flex-flow: column;
  height: 545px;
`;
export default ForgotPassword;
