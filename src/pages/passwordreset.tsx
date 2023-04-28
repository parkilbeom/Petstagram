import React, { useState } from "react";
import firebase, { auth } from "@/firebase/app";
import "firebase/auth";
import styled from "styled-components";
import { Article } from "./register";
import Link from "next/link";
import securityImage from "../public/images/security.svg";
import Image from "next/image";
import {
  RegisterButton,
  RegisterInput,
} from "@/components/register/RegisterStyles";

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
        <Image src={securityImage} alt="보안 이미지" width={100} height={100} />
        <h2>로그인에 문제가 있나요?</h2>
        <p>이메일 주소을 입력 하시면</p>
        <p className="lastP">
          계정에 다시 액세스할 수 있는 링크를 보내드립니다.
        </p>
        <Message isError={error ? true : false}>{message}</Message>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="a11y-hidden">
            이메일:
          </label>
          <RegisterInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 ,전화번호,사용자 이름"
          />
          <RegisterButton type="submit">로그인 링크 보내기</RegisterButton>
        </form>
        <span className="orSpan">또는</span>
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
  width: 393px;
  height: 40px;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #ffb800;

  .loginLink {
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    color: black;
    background-color: #fff3ca;
    display: flex;
    height: 100%;
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 320px;
  }
`;
const Message = styled.p<MessageProps>`
  color: ${(props) => (props.isError ? "#ff0000" : "black")};
  position: absolute;
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
  top: 260.5px;
  left: ${(props) => (props.isError ? "130px" : "70px")};
`;
const Div = styled.div`
  position: relative;
  form {
    display: flex;
    flex-flow: column;
  }
  input {
    margin-bottom: 21px;
  }
  .lastP {
    margin-bottom: 60px;
  }
  a {
    color: black;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
  }
  text-align: center;
  border: 1px solid #ffb800;
  width: 393px;
  height: 515px;
  display: flex;
  flex-flow: column;
  h2 {
    margin-bottom: 21px;
  }
  h2,
  p {
    font-weight: 500;
    font-size: 15px;
  }
  p:last-child {
  }
  img {
    margin: 50.5px auto 21px auto;
  }
  .orSpan {
    margin: 24px auto;
    font-weight: 500;
    font-size: 15px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .orSpan::before,
  .orSpan::after {
    content: "";
    display: block;
    width: 116px;
    background-color: #ffb800;
    height: 1px;
  }
  .orSpan::before {
    margin-right: 29px;
  }
  .orSpan::after {
    margin-left: 29px;
  }
  @media only screen and (max-width: 767px) {
    border: none;
  }
`;
export default ForgotPassword;
