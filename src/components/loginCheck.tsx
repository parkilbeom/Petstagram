import { login } from "@/redux/userUid";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import firebase from "@/firebase/app";

interface state {
  userUid: { value: string };
}

export default function LoginCheck() {
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState("비로그인 상태");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoginCheck(user.uid);
        // const db = firebase.firestore();
        // const userInfoRef = db.collection("users").doc(user.uid);
        // userInfoRef.get().then((doc) => {
        //   console.log(
        //     `로그인상태\nUID : ${user.uid} \n닉네임 : ${doc.data()?.name}`
        //   );
        // });
        dispatch(login());
      } else {
        console.log("로그아웃상태");
      }
    });
  }, []);

  const userUid = useSelector((state: state) => state.userUid.value);
  return <p>로그인 상태 : {userUid}</p>;
}
