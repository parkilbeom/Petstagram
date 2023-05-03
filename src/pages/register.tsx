import { auth, db, usersRef } from "@/firebase/app";
import Link from "next/link";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  RegisterButton,
  RegisterInput,
} from "@/components/register/RegisterStyles";
import logo from "../public/images/logo.svg";
import Image from "next/image";

interface FormState {
  email: string;
  password: string;
  displayName: string;
  nickName: string;
}

export default function Signup() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    displayName: "",
    nickName: "",
  });
  const [onButton, setonButton] = useState<boolean>(true);
  const [onPassword, setonPassword] = useState<boolean>(true);
  const [onDuplicate, setonDuplicate] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  // 이메일 변경시 중복확인한거 해체 함수
  const unCheckDUplicate = () => {
    setonDuplicate(false);
  };
  // 중복 기능 검사
  const checkDuplicate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formState.email == "") {
      return alert("아이디를 입력해주세요");
    }
    const emailSnapshot = await usersRef
      .where("email", "==", formState.email)
      .get();
    if (!emailSnapshot.empty) {
      setonDuplicate(false);
      alert("이미 존재하는 아이디입니다.");
    } else {
      setonDuplicate(true);
      alert("사용가능한 아이디입니다.");
    }
  };
  // 비밀번호 확인 기능
  const confirmInputChange = (): void => {
    if (
      passwordRef.current &&
      confirmPasswordRef.current &&
      passwordRef.current.value == confirmPasswordRef.current.value
    ) {
      setonPassword(false);
    } else {
      setonPassword(true);
    }
  };
  // 회원가입 버튼
  function validateEmail(email: string) {
    // 이메일 주소의 유효성을 검사하는 정규식
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  const isValidPassword = (password: string) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  };
  const signup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formState.email == "") {
      return setErrorMessage("이메일을 입력해주세요.");
    }
    if (!validateEmail(formState.email)) {
      return setErrorMessage("올바른 이메일 주소가 아닙니다.");
    }
    if (!onDuplicate) {
      return setErrorMessage("중복확인은 필수입니다.");
    }
    if (!formState.displayName) {
      return setErrorMessage("성명을 입력해주세요.");
    }
    if (!formState.nickName) {
      return setErrorMessage("사용자 이름을 입력해주세요.");
    }
    if (!isValidPassword(formState.password)) {
      return setErrorMessage("비밀번호는 6자 이상이어야 합니다.");
    }
    if (onPassword) {
      return setErrorMessage("비밀번호를 확인해주세요.");
    }
    setonButton(false);
    try {
      await auth
        .createUserWithEmailAndPassword(formState.email, formState.password)
        .then((userData) => {
          const user: any = userData.user;
          console.log("User created:", user.uid);

          usersRef.doc(user.uid).set({
            name: formState.displayName,
            nickname: formState.nickName,
            email: user.email,
            post_uid: [],
            introduce: "",
            profile_url: "",
            phone: "",
            followers: [],
            following: [],
            scrap: [],
          });
          router.push("/login");
        });
    } catch (error) {
      console.error(error);
    }
  };
  // 파이어베이스로 보내주는 객체 상태관리하는 함수
  const handleInputChange = (e: { target: { id: string; value: string } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Article>
      <Form>
        <Image src={logo} alt="로고" width={178.75} height={38.48} />
        <label htmlFor="email" className="a11y-hidden">
          이메일
        </label>
        <RegisterInput
          type="email"
          id="email"
          value={formState.email}
          onChange={(e) => {
            handleInputChange(e);
            unCheckDUplicate;
          }}
          required
          placeholder="이메일"
        />
        <DuplicateButton
          onClick={(e) => {
            checkDuplicate(e);
          }}
          // className="duplicateButton"
        >
          이메일 중복확인
        </DuplicateButton>
        <label htmlFor="displayName" className="a11y-hidden">
          성명
        </label>
        <RegisterInput
          type="text"
          id="displayName"
          value={formState.displayName}
          onChange={handleInputChange}
          required
          placeholder="성명"
        />
        <label htmlFor="nickName" className="a11y-hidden">
          사용자 이름
        </label>
        <RegisterInput
          type="text"
          id="nickName"
          value={formState.nickName}
          onChange={handleInputChange}
          required
          placeholder="사용자 이름"
        />
        <label htmlFor="password" className="a11y-hidden">
          비밀번호:
        </label>
        <RegisterInput
          type="password"
          id="password"
          ref={passwordRef}
          value={formState.password}
          onChange={(e) => {
            handleInputChange(e);
            confirmInputChange();
          }}
          required
          placeholder="비밀번호"
        />
        <label htmlFor="confirmPassword" className="a11y-hidden">
          비밀번호 확인
        </label>
        <RegisterInput
          type="password"
          ref={confirmPasswordRef}
          onChange={confirmInputChange}
          required
          placeholder="비밀번호 확인"
        />
        <p className="errorMessage">{errorMessage}</p>
        <RegisterButton
          type="submit"
          onClick={signup}
          disabled={onButton ? false : true}
          className="submitButton"
        >
          가입
        </RegisterButton>
      </Form>
      <Div>
        <p>계정이 있으신가요?</p>
        <Link href="/login">로그인</Link>
      </Div>
    </Article>
  );
}

const Div = styled.div`
  display: flex;
  flex-flow: row;
  gap: 10px;
  margin-top: 32px;
  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
  a {
    font-weight: 500;
    font-size: 12px;
    color: #ff7761;
    text-decoration: none;
    z-index: 99;
  }
  @media only screen and (max-width: 767px) {
    margin-top: 0px;
  }
`;
export const Article = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
const Form = styled.form`
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 393px;
  height: 478px;
  border: 1px solid #ffb800;
  display: flex;
  flex-flow: column;
  .errorMessage {
    margin: 10px auto;
    color: #ff3700;
    font-weight: 500;
    font-size: 15px;
  }
  img {
    margin: 39px 0 16px 0;
  }
  * {
    margin-bottom: 10px;
  }
  .duplicateButton {
    cursor: pointer;
    border: none;
    border-radius: 4px;

    position: absolute;
    top: 105px;
    right: 45px;
    background-color: #ffb800;
    color: white;
  }
  .submitButton {
    cursor: pointer;
    margin-top: 6px;
  }
  @media only screen and (max-width: 767px) {
    border: none;
  }
`;
const DuplicateButton = styled.button`
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  width: 315px;
  height: 30px;
  border: 1px solid#ffb800;
  border-radius: 3px;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin-bottom: 10px;
  color: #ffb800;
  @media only screen and (max-width: 767px) {
    width: 253px;
  }
`;
