import styled from "styled-components";
import firebase from "@/firebase/app";

import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebase/app";

export default function EditPassword() {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // input value 변경 시 실행되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 비밀번호 변경 함수
  const changePassword = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.updatePassword(formState.newPassword);
        router.push("/");
      } else {
        setError("로그인이 필요한 서비스입니다.");
      }
    } catch {
      () => {
        setError("비밀번호 변경에 실패했습니다.");
      };
    }
  };

  // 폼 전송 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (formState.newPassword !== formState.newPasswordConfirm) {
      setError("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }
    // 비밀번호 변경
    if (auth.currentUser?.email) {
      auth
        .signInWithEmailAndPassword(
          auth.currentUser.email,
          formState.currentPassword
        )
        .then(() => {
          changePassword();
        })
        .catch(() => {
          setError("현재 비밀번호가 알맞지 않습니다.");
        });
    }
  };

  return (
    <EditDiv>
      <Form onSubmit={handleSubmit}>
        <label>
          <span>현재 비밀번호</span>
          <input
            type="password"
            name="currentPassword"
            value={formState.currentPassword}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>새로운 비밀번호</span>
          <input
            type="password"
            name="newPassword"
            value={formState.newPassword}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>새로운 비밀번호 확인</span>
          <input
            type="password"
            name="newPasswordConfirm"
            value={formState.newPasswordConfirm}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">비밀번호 변경</button>
      </Form>
      {error && <p>{error}</p>}
    </EditDiv>
  );
}

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-flow: column;
  margin: 0 144px 0 134px;
  label {
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
    display: flex;
  }
  label input {
    width: 507px;
    height: 41px;
  }
  label span {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
  button {
    position: relative;
    top: 50px;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: white;
    background: #2fb4ff;
    width: 159px;
    height: 35px;
  }
`;
export const EditDiv = styled.div`
  border: 1px solid black;
  width: 1010px;
  height: 800px;
`;
