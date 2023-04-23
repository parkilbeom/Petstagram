import styled from "styled-components";
import { Article, Form } from "./register";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase, { auth, usersRef } from "@/firebase/app";

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`로그인 상태+${user}`);
        // 사용자가 로그인한 경우 처리할 작업
      } else {
        console.log("로그아웃 상태");
        // 사용자가 로그아웃한 경우 처리할 작업
      }
    });

    return unsubscribe;
  }, []);
  const [showPopup, setShowPopup] = useState(false);
  //  로그인 버튼
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(formState.email, formState.password)
        .then(() => {
          console.log("로그인 성공");
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
      <Form>
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
      </Form>
      {showPopup && <p>로그인 확인부탁</p>}
      <Div>
        <p>계정이 없으신가요?</p>
        <Link href="/register">가입하기</Link>
      </Div>
      <button onClick={handleLogout}>로그아웃</button>
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
