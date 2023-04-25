import styled from "styled-components";
import { EditDiv } from "./EditPaswword";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData, getUserUid, updateData } from "@/firebase/utils";
import { useRouter } from "next/router";
interface state {
  userUid: { value: string };
}
interface User {
  name: string;
  nickname: string;
  email: string;
  post_uid: string[] | null;
  introduce: string | null;
  profile_url: string | null;
  phone: string | null;
  followers: string[] | null;
  following: string[] | null;
  scrap: string[] | null;
}
interface FormState {
  name: string;
  nickname: string;
  introduce: string;
  phone: number | null;
  profile_url: string;
}
export default function EditProfile() {
  const [introduce, setIntroduce] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [uid, setUid] = useState<string>("");
  const [lender, setLender] = useState<boolean>(false);
  const router = useRouter();
  const [userData, setUserData] = useState<User>({
    name: "",
    nickname: "",
    email: "",
    post_uid: [],
    introduce: "",
    profile_url: "",
    phone: "",
    followers: [],
    following: [],
    scrap: [],
  });
  const [formState, setFormState] = useState<FormState>({
    name: "",
    nickname: "",
    introduce: "",
    phone: null,
    profile_url: "",
  });
  const userUid = useSelector((state: state) => state.userUid.value);
  useEffect(() => {
    if (userData.name == "") {
      getData("users", userUid).then((item: any) => {
        setUserData(item);
        setLender(true);
      });
    }
  }, []);
  // 카운트 함수
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(e.target.value);
    setCount(e.target.value.length);
  };
  // 업데이트 버튼
  const updateButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateData("users", userUid, formState);
  };
  const handleInputChange = (e: { target: { id: string; value: string } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <EditDiv>
      {lender && (
        <Form>
          <label>
            <img src="" alt="프로필 사진" />
            <Div>
              <p>{userData.name}</p>
              <input type="file"></input>
            </Div>
          </label>
          <label>
            <span>성명</span>
            <Div>
              <input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={handleInputChange}
              />
              <p>
                사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을
                <br />
                사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.
              </p>
              <p>이름은 14일 안에 두 번만 변경할 수 있습니다.</p>
            </Div>
          </label>
          <label>
            <span>사용자 이름</span>
            <Div>
              <input
                type="text"
                name="username"
                id="nickname"
                value={formState.nickname}
                onChange={handleInputChange}
              />
              <p>
                대부분의 경우 이후 14일 동안 사용자 이름을 <br />
                다시 {userData.nickname}(으)로 변경할 수 있습니다.
              </p>
            </Div>
          </label>
          <label>
            <span>소개</span>
            <Div>
              <textarea
                className="introduceInput"
                onChange={(e) => {
                  onChangeHandler(e);
                  handleInputChange(e);
                }}
                id="introduce"
                value={formState.introduce}
                name="introduct"
                maxLength={150}
              ></textarea>
              <p>{count}/150</p>
            </Div>
          </label>
          {/* <label>
            <span>이메일</span>
            <input type="email" name="email" />
          </label> */}
          <label>
            <span>전화번호</span>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formState.phone ?? ""}
              onChange={handleInputChange}
            />
          </label>
          <button
            className="submitButton"
            onClick={(e) => {
              updateButtonHandler(e);
            }}
          >
            변경
          </button>
        </Form>
      )}
    </EditDiv>
  );
}

const Form = styled.form`
  height: 100%;
  position: relative;
  margin: 0 194px 0 134px;
  display: flex;
  flex-flow: column;
  label {
    justify-content: space-between;
    margin-top: 20px;
    display: flex;
  }
  label input {
    width: 527px;
  }

  label span {
    text-align: right;
    display: block;
    width: 120px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
  .submitButton {
    position: absolute;
    bottom: 50px;
    right: 0;
    font-weight: 600;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    color: white;
    width: 75px;
    height: 35px;
    background: #2fb4ff;
  }
`;

const Div = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;
  .introduceInput {
    height: 121px;
    width: 527px;
    overflow: scroll;
    line-height: 24px;
    overflow-x: hidden;
    resize: none;
  }
  p {
    font-size: 15px;
  }
`;
