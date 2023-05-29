import * as S from '@/components/PostCard/PostCard.styled';

import React, { useEffect, useState, useRef } from 'react';
import { ImageSwiper } from '../ImageSwiper/ImageSwiper';
import { User, Comment } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';
import {
  PostHeader,
  SimpleCommentUnit,
  DetailCommentUnit,
  PostIcon,
  LikeList,
  AddComment,
  DetailComment,
} from '@/components/index';

import { getColor } from '@/theme/utils';
import { isCreateAtType, caculateTime } from '@/utils/mainUtil';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase/app';
import styled from 'styled-components';

interface PostCardProps {
  postId: string;
}

export function DetailPostCard({ postId }: PostCardProps) {
  const [post, setPost] = useState<DocumentData | undefined>(undefined);
  const [postUserData, setPostUserData] = useState<User | undefined>(undefined);
  const [likeEmail, setLikeEmail] = useState<string[]>([]);
  const [postDateP, setPostDateP] = useState<string>('');
  const [commentIndex, setCommentIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const images = post?.images;
  const postUserId = postUserData?.email?.split('@')[0];

  const getUserData = async () => {
    if (!postUserData && post) {
      const result = (await getData('users', post.user_uid)) as User;
      if (result) setPostUserData(result);
    }
  };

  const getLikeUsers = async (uid: string) => {
    if (!postUserData && post) {
      const result = (await getData('users', uid)) as User;
      if (result) setLikeEmail((likeEmail) => [...likeEmail, result.email]);
    }
  };

  const handleAddRecomment = (index: number | null) => {
    setCommentIndex(index);
  };

  useEffect(() => {
    const postDocRef = doc(db, 'posts', postId);
    const unsub = onSnapshot(postDocRef, (doc) => {
      setPost((prev) => {
        const newPost = { ...prev, ...doc.data() };
        return newPost;
      });
    });

    return () => {
      unsub();
    };
  }, [onSnapshot]);

  useEffect(() => {
    if (post !== undefined) {
      getUserData();
      post.like.map((uid: string) => {
        getLikeUsers(uid);
      });

      if (isCreateAtType(post.createAt)) {
        setPostDateP(caculateTime(post.createAt.seconds));
      }
    }
  }, [post]);

  return (
    <>
      {post && postUserData && likeEmail ? (
        <PostModal>
          <ImageSwiper images={images} />
          <S.Article>
            <PostHeader
              props={{
                postUserData,
                postUserId,
              }}
            ></PostHeader>
            <S.CommentSection>
              <S.FlexRow>
                <S.InitialLink href='/main' passHref>
                  <S.IdLink>{postUserId}</S.IdLink>
                </S.InitialLink>
                <p>{post?.content}</p>
              </S.FlexRow>
              <span>{postDateP}</span>
              {post?.comment.map((data: Comment, index: number) => {
                return (
                  <>
                    <DetailComment
                      postId={postId}
                      data={data}
                      index={index}
                      onClickRecomment={handleAddRecomment}
                      ref={inputRef}
                    />
                  </>
                );
              })}
            </S.CommentSection>
            <PostIcon />
            <LikeList likeEmail={likeEmail} />
            {commentIndex ? (
              <AddComment
                postId={postId}
                index={commentIndex}
                onClickRecomment={handleAddRecomment}
                ref={inputRef}
              />
            ) : (
              <AddComment
                postId={postId}
                onClickRecomment={handleAddRecomment}
                ref={inputRef}
              />
            )}
          </S.Article>
        </PostModal>
      ) : null}
    </>
  );
}

const PostModal = styled.article`
  display: flex;
  flex-flow: row nowrap;
`;
