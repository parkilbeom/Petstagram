import { auth, db, usersRef } from "@/firebase/app";
import Link from "next/link";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

interface FormState {
  email: string;
  password: string;
  displayName: string;
}

export default function Signup() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    displayName: "",
  });
  const [onButton, setonButton] = useState<boolean>(true);
  const [onPassword, setonPassword] = useState<boolean>(true);
  const [onDuplicate, setonDuplicate] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
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
      setonPassword(true);
    } else {
      setonPassword(false);
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
      return alert("이메일을 입력해주세요.");
    }
    if (!validateEmail(formState.email)) {
      return alert("올바른 이메일 주소가 아닙니다.");
    }
    if (!onDuplicate) {
      return alert("중복확인은 필수입니다.");
    }
    if (!formState.displayName) {
      return alert("사용자 이름을 입력해주세요.");
    }
    if (!isValidPassword(formState.password)) {
      return alert("비밀번호는 6자 이상이어야 합니다.");
    }
    if (!onPassword) {
      return alert("비밀번호를 확인해주세요.");
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
        <p>반려동물을 위한 커뮤니티에 가입하세요.</p>
        <label htmlFor="email">
          이메일:
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => {
              handleInputChange(e);
              unCheckDUplicate;
            }}
            required
          />
          <button
            onClick={(e) => {
              checkDuplicate(e);
            }}
          >
            중복확인
          </button>
        </label>
        <label htmlFor="displayName">
          사용자 이름:
          <input
            type="text"
            id="displayName"
            value={formState.displayName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="password">
          비밀번호:
          <input
            type="password"
            id="password"
            ref={passwordRef}
            value={formState.password}
            onChange={(e) => {
              handleInputChange(e);
              confirmInputChange();
            }}
            required
          />
        </label>
        <label htmlFor="confirmPassword">
          비밀번호 확인:
          <input
            type="password"
            ref={confirmPasswordRef}
            onChange={confirmInputChange}
            required
          />
        </label>
        {/* {onPassword ? null : <p>비밀번호가 틀립니다.</p>} */}
        <button
          type="submit"
          onClick={signup}
          disabled={onButton ? false : true}
        >
          가입
        </button>
      </Form>
      <Link href="/login">로그인하기</Link>
    </Article>
  );
}

const Article = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Form = styled.form`
  border: 1px solid black;
  width: 100%;
  max-width: 398px;
  min-width: 320px;
  display: flex;
  flex-flow: column;
  height: 572px;
`;
