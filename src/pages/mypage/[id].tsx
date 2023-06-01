import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { MenuBarLayout } from "@/components";
import { userUidState, userDataState } from "@/types/index";
import { getData } from "@/firebase/utils";
import { User, Post } from "@/types/index";
import styled from "styled-components";
import baseProfile from "@/public/profile.jpg";
import multiIcon from "@/public/icons/PostCard/moreVertical.png";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "@/redux/modal";
import FollowerModal from "@/components/popup/Template/FollowerModal";
const UserProfile = styled.div``;
const Gallery = styled.div``;
const GalleryFrame = styled.div`
  position: relative;
`;
const Multiple = styled(Image)`
  position: absolute;
  right: 0;
  top: 0;
  background-color: white;
  //나중에 지울것
`;

const Clickable = styled.div`
  cursor: pointer;
`;

export default function MyPage() {
  const router = useRouter();
  const { id } = router.query;
  const [userInfo, setUserInfo] = useState<User | {}>({});
  const [postInfo, setPostInfo] = useState<Post[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const _postInfo = useRef<Post[] | []>([]);
  const dispatch = useDispatch();
  const addPostInfo = (post: Post) => {
    _postInfo.current = [..._postInfo.current, post];
    setPostInfo([..._postInfo.current]);
  };
  const getUserInfoData = async (id: string) => {
    await getData("users", id).then(data => {
      setUserInfo(data as User);
      setIsLoading(true);
    });
  };
  const getPostInfoData = async (id: string) => {
    await getData("posts", id).then(data => {
      addPostInfo(data as Post);
    });
  };
  useEffect(() => {
    if (!router.isReady) return;
    getUserInfoData(id as string);
  }, [router.isReady]);
  useEffect(() => {
    userInfo["post_uid"]?.map(post => getPostInfoData(post));
  }, [userInfo]);
  if (!isLoading) return <MenuBarLayout>로딩중</MenuBarLayout>;
  else
    return (
      <MenuBarLayout>
        <UserProfile>
          <Image
            src={userInfo["profile_url"] || baseProfile}
            width="150"
            height="150"
            alt={`유저 사진`}
          />
          {userInfo["name"]}
          <div>게시물 {userInfo["post_uid"].length}</div>
          <Clickable
            onClick={() =>
              dispatch(
                setModal(<FollowerModal followers={userInfo["followers"]} />)
              )
            }
          >
            팔로워 {userInfo["followers"].length}
          </Clickable>
          <div>팔로잉 {userInfo["following"].length}</div>
        </UserProfile>
        <Gallery>
          {postInfo.map((post, index) => (
            <GalleryFrame key={index}>
              <Image
                src={post.images[0].src || baseProfile}
                width="150"
                height="150"
                alt={post.images[0].alt || `유저 사진`}
              />
              {post.images.length > 1 && (
                <Multiple
                  src={multiIcon}
                  width="25"
                  height="25"
                  alt="여러장 보기"
                />
              )}
            </GalleryFrame>
          ))}
        </Gallery>
      </MenuBarLayout>
    );
}
