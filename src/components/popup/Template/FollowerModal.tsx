import { Wrapper } from "./FollowerModal.styles";
import { useState, useRef, useEffect } from "react";
import { getData } from "@/firebase/utils";
import { User } from "@/types/index";
import { setModal } from "@/redux/modal";
import { useDispatch } from "react-redux";
interface FollowersType extends User {
  id: string;
}

export default function FollowerModal({ followers = [] }) {
  const [followerInfo, setFollowerInfo] = useState([]);
  const _followersInfo = useRef<FollowersType[] | []>([]);
  const dispatch = useDispatch();
  const addFollowersInfo = (follower: FollowersType) => {
    _followersInfo.current = [..._followersInfo.current, follower];
    setFollowerInfo([..._followersInfo.current]);
  };
  const getFollowerData = async (id: string) => {
    await getData("users", id).then((data: User) => {
      if (_followersInfo.current.filter(item => item.id === id).length >= 1)
        return;
      addFollowersInfo({ ...data, id: id } as FollowersType);
    });
  };
  useEffect(() => {
    followers.forEach(follower => getFollowerData(follower));
  }, []);
  return (
    <Wrapper>
      {followerInfo.map((follower, index) => (
        <div key={index}>
          <div>{follower.name}</div>
          <div>{follower.nickname}</div>
        </div>
      ))}

      <div onClick={() => dispatch(setModal(null))}>닫기</div>
    </Wrapper>
  );
}
