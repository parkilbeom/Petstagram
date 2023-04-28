import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import firebase, { auth } from "@/firebase/app";
import Image from "next/image";
import loginBanner from "../public/images/loginBanner.png";
import logo from "../public/images/logo.svg";
import {
  RegisterButton,
  RegisterInput,
} from "@/components/register/RegisterStyles";
interface state {
  userUid: { value: string };
}

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  //  로그인 버튼

  function validateEmail(email: string) {
    // 이메일 주소의 유효성을 검사하는 정규식
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formState.email == "") {
      return setErrorMessage("이메일을 입력해주세요.");
    }
    if (!validateEmail(formState.email)) {
      return setErrorMessage("올바른 이메일 주소가 아닙니다.");
    }
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(formState.email, formState.password)
        .then(() => {
          console.log("로그인 성공");
          location.reload();
          // router.push("/");
        });
    } catch (error) {
      setErrorMessage("이메일, 비밀번호를 확인해주세요.");
      // 로그인 실패 시 처리할 작업
    }
  };
  // 로그아웃 버튼 (임시)

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Successfully logged out");

      // 로그아웃 후 처리할 작업이 있다면 여기에 추가할 수 있습니다.
    } catch (error) {
      console.error("Error occurred while logging out", error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Article>
      {/* alt 안준 이유는 슬비쌤이 이런 광고성 배너는 비워두는게 좋다고 하심 */}
      <Image
        className="loginBanner"
        src={loginBanner}
        alt=""
        width={398}
        height={501}
      />
      <SectionWrapper>
        <MainDiv>
          <Image src={logo} alt="로고" width={178.75} height={38.48} />
          <form>
            <label htmlFor="email" className="a11y-hidden">
              이메일
            </label>
            <RegisterInput
              className="emailInput"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              id="email"
              placeholder="이메일"
              required
            />

            <label htmlFor="password" className="a11y-hidden">
              비밀번호
            </label>
            <RegisterInput
              type="password"
              className="passwordInput"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              id="password"
              placeholder="비밀번호"
              required
            />

            <RegisterButton type="submit" onClick={handleSignIn}>
              로그인
            </RegisterButton>
          </form>
          <span className="orSpan">또는</span>
          <p className="errorMessage">{errorMessage}</p>
          <Link className="searchPassword" href="/passwordreset">
            비밀번호를 잊으셨나요?
          </Link>
        </MainDiv>
        <SideDiv>
          <p>계정이 없으신가요?</p>
          <Link href="/register">가입하기</Link>
        </SideDiv>
        {showPopup && <p>로그인 확인부탁</p>}
        <form action="">
          <button type="submit" onClick={handleLogout}>
            로그아웃
          </button>
        </form>
      </SectionWrapper>
    </Article>
  );
}

const SectionWrapper = styled.div`
  width: 393px;
  height: 501.48px;
`;
const Article = styled.article`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  gap: 34.28px;
  @media only screen and (max-width: 1024px) {
    .loginBanner {
      display: none;
    }
  }
`;
const FlexDiv = styled.div`
  display: flex;
  flex-flow: row;
`;
const MainDiv = styled.div`
  .errorMessage {
    margin: 0 auto;
    color: #ff3700;
    font-weight: 500;
    font-size: 15px;
  }
  img {
    display: block;
    margin: 0 auto;
    margin-top: 39px;
    margin-bottom: 24px;
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
  .searchPassword {
    margin: 0 auto;
    font-weight: 500;
    font-size: 18px;
    margin-top: 24px;
    color: black;
    text-decoration: none;
  }
  form {
    display: flex;
    flex-flow: column;
  }
  .emailInput {
    margin-bottom: 10px;
  }
  .passwordInput {
    margin-bottom: 24px;
  }
  border: 1px solid #ffb800;
  width: 100%;
  max-width: 398px;
  min-width: 320px;
  display: flex;
  flex-flow: column;
  height: 418.48px;
  @media only screen and (max-width: 767px) {
    border: none;
    .orSpan::before,
    .orSpan::after {
      width: 87px;
    }
  }
`;
const SideDiv = styled.div`
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  height: 68px;
  width: 100%;
  max-width: 398px;
  min-width: 320px;
  border: 1px solid #ffb800;
  display: flex;
  flex-flow: row;
  gap: 14px;
  p {
    font-weight: 500;
    font-size: 16px;
  }
  a {
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    color: #ff7761;
  }
  @media only screen and (max-width: 767px) {
    margin-top: 0;
    border: none;
  }
`;
