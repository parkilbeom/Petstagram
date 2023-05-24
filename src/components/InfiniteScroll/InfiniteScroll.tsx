// components/InfiniteScroll.tsx
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Post, User } from './postList';
import { PostCard } from '@/components';
import { userUidState, userDataState } from '@/types/index';

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/app';

let lastVisible: any = undefined;
let isFirst = true;

export function InfiniteScroll(): JSX.Element {
  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  const [userData, setUserData] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [follows, setFollows] = useState<string[]>([]);

  useEffect(() => {
    if (!userInfo.isLoading && userData === undefined) {
      setUserData(userInfo.data);
      setFollows([userUid, ...userInfo.data.following]);
    }
  }, [userInfo]);

  // 게시물 첫 렌더링(스크롤 없이)
  useEffect(() => {
    if (follows.length != 0 && isFirst) {
      getNextPosts();
      isFirst = false;
    }
  }, [follows]);

  const getNextPosts = () => {
    let q;
    if (lastVisible === -1) {
      // 더 이상 데이터가 없을 때
      alert('마지막 입니다~');
      return;
    } else if (lastVisible) {
      // 다음꺼 렌더링
      q = query(
        collection(db, 'posts'),
        where('user_uid', 'in', follows),
        orderBy('createAt', 'desc'),
        limit(2),
        startAfter(lastVisible)
      );
    } else {
      // 처음 렌더링
      q = query(
        collection(db, 'posts'),
        where('user_uid', 'in', follows),
        orderBy('createAt', 'desc'),
        limit(4)
      );
    }

    getDocs(q).then((snapshot) => {
      setPosts((posts) => {
        const postArr = [...posts];
        snapshot.forEach((doc) => {
          postArr.push(doc.data() as Post);
        });
        return postArr;
      });

      if (snapshot.docs.length === 0) {
        lastVisible = -1;
      } else {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }
    });
  };

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
    const { scrollHeight } = document.body;
    // 브라우저 총 내용의 크기 (스크롤을 포함한다)
    const { scrollTop } = document.documentElement;
    // 현재 스크롤바의 위치////
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.
      if (follows.length != 0) {
        getNextPosts();
      }
    }
  }, [posts, follows]);

  useEffect(() => {
    // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll, posts]);

  return (
    <Container>
      {posts.map((post: Post, idx: number) => (
        <PostCard key={idx} post={post} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  max-width: 614px;
`;
