import styled from "styled-components";
import firebase from "@/firebase/app";
import Link from "next/link";
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
    <EditDiv isPassword>
      <Form onSubmit={handleSubmit}>
        <label>
          <span>이전 비밀번호</span>
          <EditInput
            type="password"
            name="currentPassword"
            value={formState.currentPassword}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>새 비밀번호</span>
          <EditInput
            type="password"
            name="newPassword"
            value={formState.newPassword}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>새 비밀번호 확인</span>
          <EditInput
            type="password"
            name="newPasswordConfirm"
            value={formState.newPasswordConfirm}
            onChange={handleInputChange}
          />
        </label>
        <label className="buttonLabel">
          <button type="submit">비밀번호 변경</button>
        </label>
        {/* 로그인한 상태인데 맞지 않는 것 같아서 뺄게요 */}
        {/* <div className="">
          <Link href="/">비밀번호를 잊으셨나요?</Link>
        </div> */}
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
  label:first-child {
    margin-top: 50px;
  }
  label {
    justify-content: space-between;
    margin-top: 20px;
    display: flex;
  }
  label span {
    margin-right: 42px;
    text-align: right;
    display: block;
    width: 180px;
    line-height: 1.5;
    align-items: center;
    font-weight: 600;
    font-size: 24px;
  }
  .buttonLabel {
    width: 100%;
    align-items: left;
  }
  .buttonLabel button {
    cursor: pointer;
    margin-left: 212px;
    border: none;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    width: 126px;
    height: 30px;
    background: #ffb800;
    border-radius: 5px;
  }
`;
export const EditInput = styled.input`
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 20px;
  width: 497px;
  height: 34px;
  background: #fff3ca;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  color: #898989;
  border: none;
`;

type isPassword = {
  isPassword: boolean;
};
export const EditDiv = styled.div<isPassword>`
  border: 0.5px solid #ffb800;
  width: 1008px;
  height: ${(props) => (props.isPassword ? "350px" : "650px")};
`;
