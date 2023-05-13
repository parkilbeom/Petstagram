import * as S from './PostCard.styled';

import React, { useEffect, useState } from 'react';
import { ImageSwiper } from '../ImageSwiper/ImageSwiper';
import { Post, User } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';
import {
  PostHeader,
  SimpleCommentUnit,
  DetailCommentUnit,
  PostIcon,
  LikeList,
  AddComment,
} from '@/components/index';

import { getColor } from '@/theme/utils';
import { isCreateAtType, caculateTime } from '@/utils/mainUtil';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [postUserData, setPostUserData] = useState<User | undefined>(undefined);
  const [likeEmail, setLikeEmail] = useState<string[]>([]);
  const [postDateP, setPostDateP] = useState<string>('');
  const images = post.images;
  const postUserId = postUserData?.email.split('@')[0];

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
      <S.Article>
        <PostHeader
          props={{
            postUserData,
            postUserId,
            postDateP,
          }}
        ></PostHeader>
        <ImageSwiper images={images} />
        <PostIcon />
        <S.CommentSection>
          <LikeList likeEmail={likeEmail} />
          <S.FlexRow>
            <S.InitialLink href='/main' passHref>
              <S.IdLink>{postUserId}</S.IdLink>
            </S.InitialLink>
            <p>{post.content}</p>
          </S.FlexRow>
          <S.MoreButton color={getColor('Grey/grey-700')}>더 보기</S.MoreButton>
          <S.MoreCommentButton color={getColor('Grey/grey-700')}>
            댓글 {post.comment.length}개 모두 보기
          </S.MoreCommentButton>
          {post.comment.map((data) => {
            return (
              <>
                {/* <DetailCommentUnit data={data}></DetailCommentUnit> */}
                <SimpleCommentUnit data={data}></SimpleCommentUnit>
                {data.recomment.length != 0
                  ? data.recomment.map((recomment) => {
                      return (
                        <S.FlexRow>
                          <S.InitialLink href='/main' passHref>
                            <S.IdLink>{recomment.email.split('@')[0]}</S.IdLink>
                          </S.InitialLink>
                          <S.RecommentLink
                            href='/main'
                            passHref
                            color={getColor('blue/blue-300')}
                          >
                            <S.IdLink>@{data.email.split('@')[0]}</S.IdLink>
                          </S.RecommentLink>
                          <p>{recomment.content}</p>
                        </S.FlexRow>
                      );
                    })
                  : null}
              </>
            );
          })}
          <AddComment />
        </S.CommentSection>
      </S.Article>
    </>
  );
}
