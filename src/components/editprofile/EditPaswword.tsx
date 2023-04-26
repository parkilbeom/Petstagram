import styled from "styled-components";
import firebase from "@/firebase/app";

export default function EditPaswword() {
  const changePassword = async (newPassword: string) => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updatePassword(newPassword);
      }
      console.log("비밀번호가 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("비밀번호 변경 중 오류가 발생했습니다.", error);
    }
  };
  return <EditDiv>비밀번호 변경</EditDiv>;
}

export const EditDiv = styled.div`
  border: 1px solid black;
  width: 1010px;
  height: 800px;
`;
