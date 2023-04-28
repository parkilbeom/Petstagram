import styled from "styled-components";
import { EditDiv, EditInput } from "./EditPassword";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getData, getUserUid, pushFile, updateData } from "@/firebase/utils";
import { useRouter } from "next/router";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "@/firebase/app";
interface state {
  userUid: { value: string };
}
interface User {
  name: string;
  nickname: string;
  email: string;
  post_uid: string[] | null;
  introduce: string | null;
  profile_url: string | undefined;
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
  const fileRef = useRef<HTMLInputElement>(null);
  const [introduce, setIntroduce] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [uid, setUid] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(undefined);
    }
  };
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
  // 리덕스 통해 uid 받아서 유저 데이터 받아오기
  const userUid = useSelector((state: state) => state.userUid.value);
  useEffect(() => {
    if (render == false) {
      getData("users", userUid).then((item: any) => {
        setUserData(item);
        setRender(true);
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
    if (
      formState.introduce == "" &&
      formState.name == "" &&
      formState.nickname == "" &&
      formState.phone == null &&
      fileRef.current?.files &&
      !fileRef.current.files[0]
    ) {
      return alert("변경이 없습니다.");
    }
    //  파일 전송
    if (fileRef.current?.files && fileRef.current.files[0]) {
      const file = fileRef.current.files[0];
      const imageRef = ref(storage, `profileimages/${file.name}`);
      uploadBytes(imageRef, file).then(() => {
        // 이미지 전송 후 url 받은 후 데이터 업데이트하게 진행
        getDownloadURL(imageRef).then((item) => {
          formState.profile_url = item;
          const newObject: { [key: string]: string | null | undefined } = {};
          Object.entries(formState).forEach(([key, value]) => {
            if (
              formState.hasOwnProperty(key) &&
              value !== "" &&
              value !== null
            ) {
              newObject[key] = value;
            }
          });
          updateData("users", userUid, newObject);
          // 라우터 부분은 나중에 컴포넌트 완성되면 에딧 모달창 꺼지게끔 변경 예정
          router.push("/");
        });
      });
    } else {
      const newObject: { [key: string]: string | null | undefined } = {};
      Object.entries(formState).forEach(([key, value]) => {
        if (formState.hasOwnProperty(key) && value !== "" && value !== null) {
          newObject[key] = value;
        }
      });
      updateData("users", userUid, newObject);
      // 라우터 부분은 나중에 컴포넌트 완성되면 에딧 모달창 꺼지게끔 변경 예정
      router.push("/");
    }

    // // 빈 값들은 업데이트 x
  };
  const handleInputChange = (e: { target: { id: string; value: string } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <EditDiv isPassword={false}>
      {render && (
        <Form>
          <label>
            {!previewImage ? (
              <img
                src={
                  userData.profile_url == ""
                    ? "https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/profile.jpg?alt=media&token=33e36a93-00ef-44ae-aae1-1273ff89dbeb"
                    : userData.profile_url
                }
                alt="프로필 사진"
              />
            ) : (
              <img src={previewImage} alt="Preview Image" />
            )}
            <Div>
              <p>{userData.name}</p>
              <input
                className="fileInput"
                type="file"
                ref={fileRef}
                onChange={handleImageUpload}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (fileRef.current) {
                    fileRef.current.click();
                  }
                }}
                className="fileButton"
              >
                프로필 사진 바꾸기
              </button>
            </Div>
          </label>
          <label>
            <span>성명</span>
            <Div>
              <EditInput
                placeholder="성명"
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={handleInputChange}
              />
              {/* <p>
                사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을
                <br />
                사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.
              </p>
              <p>이름은 14일 안에 두 번만 변경할 수 있습니다.</p> */}
            </Div>
          </label>
          <label>
            <span>사용자 이름</span>
            <Div>
              <EditInput
                placeholder="사용자 이름"
                type="text"
                name="username"
                id="nickname"
                value={formState.nickname}
                onChange={handleInputChange}
              />
              {/* <p>
                대부분의 경우 이후 14일 동안 사용자 이름을 <br />
                다시 {userData.nickname}(으)로 변경할 수 있습니다.
              </p> */}
            </Div>
          </label>
          <label>
            <span>소개</span>
            <Div>
              <EditTextarea
                className="introduceInput"
                onChange={(e) => {
                  onChangeHandler(e);
                  handleInputChange(e);
                }}
                id="introduce"
                value={formState.introduce}
                name="introduct"
                maxLength={150}
              />
              <p className="count">{count}/150</p>
            </Div>
          </label>
          {/* <label>
            <span>이메일</span>
            <input type="email" name="email" />
          </label> */}
          <label>
            <span>전화번호</span>
            <EditInput
              placeholder="전화번호"
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
    margin-bottom: 41px;
    display: flex;
  }
  .fileButton {
    text-align: left;
    padding: 0;
    font-weight: 600;
    font-size: 20px;
    color: #ff7761;
    cursor: pointer;
    border: none;
    background-color: #ffffff;
    width: 160px;
  }
  input[type="file"] {
    display: none;
  }
  label:first-child {
    margin: 50px 0;
  }
  label img {
    width: 50px;
    height: 50px;
    margin-left: 80px;
    border-radius: 50%;
    overflow: hidden;
  }
  label span {
    text-align: right;
    display: block;
    width: 120px;
    line-height: 1.5;
    font-weight: 600;
    font-size: 20px;
  }
  .submitButton {
    cursor: pointer;
    position: absolute;
    bottom: 50px;
    right: 0;
    font-weight: 600;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 16px;
    background: #ffb800;
    border-radius: 5px;
  }
`;
const EditTextarea = styled.textarea`
  border: none;
  align-items: center;
  padding: 10px;
  width: 507px;
  height: 101px;
  background: #fff3ca;
  border-radius: 5px;
  resize: none;
`;
const Div = styled.div`
  width: 527px;
  display: flex;
  flex-flow: column;
  gap: 12px;

  p {
    font-weight: 600;
    font-size: 20px;
  }
  .count {
    font-weight: 400;
    font-size: 12px;
    color: #898989;
  }
`;
