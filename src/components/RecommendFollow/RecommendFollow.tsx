import { useState, useEffect } from 'react';
import { FollowList, UserList } from '@/components';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import { userUidState, userDataState } from '@/types/index';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/app';
import { User } from '@/components/InfiniteScroll/postList';

type RecommendFollows = {
  [followingUid: string]: string[];
};

type RecommendFollowProfile = {
  email: string;
  profile_url: string;
  paragraph: string;
};

export function RecommendFollow() {
  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  const [loggedUserFollows, setLoggedUserFollows] = useState<string[]>();
  const [recommendFollows, setRecommendFollows] = useState<RecommendFollows>(
    {}
  );
  const [sortedRecommendFollows, setSortedRecommendFollows] =
    useState<RecommendFollows>({});
  const [recommendFollowsProfile, setRecommendFollowsProfile] = useState<
    RecommendFollowProfile[]
  >([]);

  useEffect(() => {
    if (!userInfo.isLoading && loggedUserFollows === undefined) {
      setLoggedUserFollows([...userInfo.data.following]);
    }
  }, [userInfo]);

  useEffect(() => {
    if (loggedUserFollows != undefined) {
      loggedUserFollows.forEach((followUid) => {
        getFollowingList(followUid);
      });
    }
  }, [loggedUserFollows]);

  useEffect(() => {
    if (recommendFollows != undefined) {
      const sortedFollowList = Object.fromEntries(
        Object.entries(recommendFollows).sort(
          (a: [string, string[]], b: [string, string[]]): number => {
            return b[1].length - a[1].length;
          }
        )
      );

      for (const [followUid, followerUids] of Object.entries(
        sortedFollowList
      )) {
        if (Object.keys(sortedRecommendFollows).length >= 5) {
          break;
        }
        setSortedRecommendFollows((prevSortedRecommend) => {
          const newSortedRecommendFollows = { ...prevSortedRecommend };
          newSortedRecommendFollows[followUid] = followerUids;
          return newSortedRecommendFollows;
        });
      }
    }
  }, [recommendFollows]);

  useEffect(() => {
    const getRecommendData = async (
      followUid: string,
      followerUids: string[]
    ) => {
      let followerParagraph = '';
      let recommendProfile = {
        email: '',
        profile_url: '',
        paragraph: '',
      };

      // 0번째 팔로하는 user email 불러오기
      const userEmailRef = doc(db, 'users', followerUids[0]);
      const userEmailSnapshot = await getDoc(userEmailRef);
      if (userEmailSnapshot.exists()) {
        const firstFollowerEmail = userEmailSnapshot.data() as User;
        const firstFollowerId = firstFollowerEmail.email.split('@')[0];
        if (followerUids.length === 1)
          followerParagraph = `${firstFollowerId}님이 팔로우합니다`;
        else
          followerParagraph = `${firstFollowerId}님 외 ${
            followerUids.length - 1
          }명이 팔로우합니다`;
      }

      // 추천 팔로우 data 불러오기
      const recommendDataRef = doc(db, 'users', followUid);
      const recommendDataSnapshot = await getDoc(recommendDataRef);
      if (recommendDataSnapshot.exists()) {
        const userData = recommendDataSnapshot.data() as User;
        recommendProfile = {
          ...recommendProfile,
          email: userData.email,
          profile_url: userData.profile_url,
          paragraph: followerParagraph,
        };
      }

      setRecommendFollowsProfile((prevData) => {
        const newRecommendData = [...prevData];

        // 추천팔로우 중복제거
        if (
          newRecommendData.some((cur) => {
            return cur.email === recommendProfile.email;
          })
        ) {
          return newRecommendData;
        }

        newRecommendData.push(recommendProfile);
        return newRecommendData;
      });
    };

    const initRecommendFollowsProfile = () => {
      setRecommendFollowsProfile([]);
    };

    const startInit = async () => {
      await initRecommendFollowsProfile();
    };

    startInit();
    Object.entries(sortedRecommendFollows).map(([followUid, followerUids]) => {
      getRecommendData(followUid, followerUids);
    });
  }, [sortedRecommendFollows]);

  const getFollowingList = async (uid: string) => {
    const userDataRef = doc(db, 'users', uid);
    const userDataSnapshot = await getDoc(userDataRef);
    if (userDataSnapshot.exists()) {
      const userData = userDataSnapshot.data() as User;
      pushFollowingList(userData.following, uid);
    }
  };

  const pushFollowingList = (followingList: string[], followerUid: string) => {
    setRecommendFollows((prevRecommendFollows) => {
      const newRecommendFollows = { ...prevRecommendFollows };
      followingList.forEach((followUid) => {
        if (!newRecommendFollows[followUid]) {
          if (!userInfo.data.following.includes(followUid))
            newRecommendFollows[followUid] = [followerUid];
        } else {
          if (!newRecommendFollows[followUid].includes(followerUid)) {
            newRecommendFollows[followUid].push(followerUid);
          }
        }
      });
      return newRecommendFollows;
    });
  };

  const userData = {
    email: userInfo.data.email.split('@')[0],
    profile_url: userInfo.data.profile_url,
    paragraph: userInfo.data.name,
  };

  return (
    <FollowArticle>
      <UserList profile={userData} />
      <TitleBox>
        <h2>회원님을 위한 추천</h2>
        <Link href='/main'>모두 보기</Link>
      </TitleBox>
      {recommendFollowsProfile.map((data: RecommendFollowProfile, index) => {
        return <FollowList key={index} profile={data} />;
      })}
    </FollowArticle>
  );
}

const FollowArticle = styled.section`
  width: 420px;
  padding: 34px 25px 20px 25px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 25px;
`;
