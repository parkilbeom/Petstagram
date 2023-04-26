import styled from "styled-components";
import { Article, Form } from "./register";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import firebase, { auth } from "@/firebase/app";

interface state {
  userUid: { value: string };
}

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
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
      return alert("이메일을 입력해주세요.");
    }
    if (!validateEmail(formState.email)) {
      return alert("올바른 이메일 주소가 아닙니다.");
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
      alert("로그인 실패");
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
      <MainDiv>
        <form>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            id="email"
            placeholder="이메일"
            required
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            id="password"
            placeholder="비밀번호"
            required
          />

          <button type="submit" onClick={handleSignIn}>
            로그인
          </button>
        </form>
        <Link className="searchPassword" href="/passwordreset">
          비밀번호를 잊으셨나요?
        </Link>
      </MainDiv>
      {showPopup && <p>로그인 확인부탁</p>}
      <SideDiv>
        <p>계정이 없으신가요?</p>
        <Link href="/register">가입하기</Link>
      </SideDiv>
      <form action="">
        <button type="submit" onClick={handleLogout}>
          로그아웃
        </button>
      </form>
    </Article>
  );
}
const MainDiv = styled.div`
  * {
    margin-top: 10px;
  }
  .searchPassword {
    margin: 0 auto;
    margin-top: 150px;
  }
  form {
    display: flex;
    flex-flow: column;
  }
  border: 1px solid black;
  width: 100%;
  max-width: 398px;
  min-width: 320px;
  display: flex;
  flex-flow: column;
  height: 572px;
`;
const SideDiv = styled.div`
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
