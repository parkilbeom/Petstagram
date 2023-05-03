import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageSwiper } from '../ImageSwiper/ImageSwiper';
import { Post, User, CreateAtType } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';
import baseProfile from '@/public/profile.jpg';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

function isCreateAtType(value: any): value is CreateAtType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'seconds' in value &&
    'nanoseconds' in value
  );
}

export function PostCard({ post }: PostCardProps) {
  const [postUserData, setPostUserData] = useState<User | undefined>(undefined);
  const [likeEmail, setLikeEmail] = useState<string[]>([]);
  const [postDateP, setPostDateP] = useState<string>('');
  const images = post.images;
  const postUserId = postUserData?.email.split('@')[0];

  // post 주인의 userData 불러오기
  const getUserData = async () => {
    if (!postUserData) {
      const result = (await getData('users', post.user_uid)) as User;
      if (result) setPostUserData(result);
    }
  };

  const getLikeUsers = async (uid: string) => {
    if (!postUserData) {
      const result = (await getData('users', uid)) as User;
      if (result) setLikeEmail((likeEmail) => [...likeEmail, result.email]);
    }
  };

  const caculateTime = (date: number): string => {
    const postDate = date;
    const nowDate = Math.round(Date.now() / 1000);

    const diff = nowDate - postDate;

    const times = [
      { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
      { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
      { name: '일', milliSeconds: 60 * 60 * 24 },
      { name: '시간', milliSeconds: 60 * 60 },
      { name: '분', milliSeconds: 60 },
    ];

    for (const time of times) {
      const betweenTime = Math.floor(diff / time.milliSeconds);

      if (betweenTime > 0) {
        return `${betweenTime}${time.name} 전`;
      }
    }

    return '방금 전';
  };

  useEffect(() => {
    getUserData();
    post.like.map((uid) => {
      getLikeUsers(uid);
    });

    if (isCreateAtType(post.createAt)) {
      setPostDateP(caculateTime(post.createAt.seconds));
    }
  }, []);

  return (
    <>
      <Article>
        <HeaderSection>
          <ProfileButton>{renderProfile(postUserData)}</ProfileButton>
          <p>{postUserId}</p>
          <p>{postDateP}</p>
          <MoreButton>...</MoreButton>
        </HeaderSection>
        <ImageSwiper images={images} />
        <FlexRow>
          <button>좋아요</button>
          <button>댓글</button>
          <button>메세지</button>
          <button>게시물저장</button>
        </FlexRow>
        <CommentSection>
          <FlexRow>
            <Link href='/main' passHref>
              <IdLink>
                {likeEmail[0] ? likeEmail[0].split('@')[0] : null}
              </IdLink>
            </Link>
            {likeEmail.length > 1 ? (
              <p>
                님 외 <strong>{likeEmail.length - 1}</strong>명이 좋아합니다
              </p>
            ) : (
              <p>님이 좋아합니다</p>
            )}
          </FlexRow>
          <FlexRow>
            <Link href='/main' passHref>
              <IdLink>{postUserId}</IdLink>
            </Link>
            <p>{post.content}</p>
          </FlexRow>
          <MoreButton>더 보기</MoreButton>
          <MoreButton>댓글 {post.comment.length}개 모두 보기</MoreButton>
          {post.comment.map((data) => {
            return (
              <>
                <FlexRow>
                  <Link href='/main' passHref>
                    <IdLink>{data.email.split('@')[0]}</IdLink>
                  </Link>
                  <p>{data.content}</p>
                </FlexRow>
                {data.recomment.length != 0
                  ? data.recomment.map((recomment) => {
                      return (
                        <FlexRow>
                          <p>@{data.email.split('@')[0]} </p>
                          <Link href='/main' passHref>
                            <IdLink>{recomment.email.split('@')[0]}</IdLink>
                          </Link>
                          <p>{recomment.content}</p>
                        </FlexRow>
                      );
                    })
                  : null}
              </>
            );
          })}
          <input type='text' placeholder='댓글 달기...'></input>
          <button>이모티콘</button>
        </CommentSection>
      </Article>
    </>
  );
}

const renderProfile = (postUserData: User | undefined) => {
  if (
    postUserData &&
    postUserData.profile_url &&
    postUserData.profile_url != ''
  ) {
    return (
      <StyledImage
        src={postUserData.profile_url}
        alt='프로필 사진'
        width={100}
        height={100}
        unoptimized
      />
    );
  }

  return (
    <StyledImage src={baseProfile} alt='프로필 사진' width={100} height={100} />
  );
};

const Article = styled.article`
  margin: 0 auto;
  border: 1px solid black;
  display: flex;
  flex-flow: column nowrap;
  max-width: 614px;
  margin-bottom: 20px;
`;

const HeaderSection = styled.section`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
`;

const ProfileButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const MoreButton = styled.button`
  color: gray;
  cursor: pointer;
`;

const CommentSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
`;

const FlexRow = styled.div`
  display: flex;
`;

const IdLink = styled.a`
  font-weight: 600;
`;
