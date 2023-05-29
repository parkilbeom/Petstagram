import * as S from '../PostCard.styled';
import styled from 'styled-components';
import React, { useEffect, useState, forwardRef, RefObject } from 'react';
import { Comment, Recomment } from '@/components/InfiniteScroll/postList';
import { renderProfile, caculateTime } from '@/utils/mainUtil';
import { Post, User } from '@/components/InfiniteScroll/postList';
import { getData, updateData } from '@/firebase/utils';
import Image from 'next/image';
import heart from '@/public/icons/PostCard/heart.png';
import { getColor } from '@/theme/utils';
import { useSelector } from 'react-redux';
import { userUidState } from '@/types/index';

interface DetailCommentUnitProps {
  postId: string;
  data: Comment | Recomment;
  commentIndex: number;
  onClickRecomment: (index: number) => void;
  recommentIndex?: number;
  inputRef: RefObject<HTMLInputElement>;
}

export const DetailCommentUnit = forwardRef<
  HTMLInputElement,
  DetailCommentUnitProps
>(function DetailCommentUnit({
  postId,
  data,
  commentIndex,
  onClickRecomment,
  recommentIndex,
  inputRef,
}) {
  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const [commentUserData, setCommentUserDate] = useState<User | undefined>(
    undefined
  );
  const [commentDateP, setPostDateP] = useState<string>('');

  const getCommentUserData = async () => {
    if (!commentUserData) {
      const result = (await getData('users', data.user_uid)) as User;
      if (result) setCommentUserDate(result);
    }
  };

  const handleAddRecomment = () => {
    onClickRecomment(commentIndex);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = `@${commentUserData?.email.split('@')[0]}`;
    }
  };

  const handleDeleteRecomment = async () => {
    const result = (await getData('posts', postId)) as Post;
    if (result) {
      if (recommentIndex != undefined) {
        // 답글 삭제
        result.comment[commentIndex].recomment.splice(recommentIndex, 1);
      } else {
        // 댓글 삭제
        result.comment.splice(commentIndex, 1);
      }

      updateData('posts', postId, result);
    }
  };

  useEffect(() => {
    getCommentUserData();
    let commentDate;

    if (typeof data.createAt === 'string') {
      commentDate = new Date(data.createAt);
    }

    setPostDateP(caculateTime(Number(commentDate) / 1000));
  }, []);

  return (
    <CommentUnit>
      <S.ProfileButton>{renderProfile(commentUserData)}</S.ProfileButton>
      <CommentDiv>
        <CommentFlexRow>
          <S.InitialLink href='/main' passHref>
            <S.IdLink>{data.email.split('@')[0]}</S.IdLink>
          </S.InitialLink>
          <p>{data.content}</p>
        </CommentFlexRow>
        <S.FlexRow>
          <CommentDate color={getColor('Grey/grey-600')}>
            {commentDateP}
          </CommentDate>
          {data.like.length !== 0 ? (
            <RecommentButton>좋아요 {data.like.length}개</RecommentButton>
          ) : null}
          <RecommentButton onClick={handleAddRecomment}>
            답글 달기
          </RecommentButton>
          {data.user_uid === userUid ? (
            <DeleteButton onClick={handleDeleteRecomment}>삭제</DeleteButton>
          ) : null}
        </S.FlexRow>
      </CommentDiv>
      <S.IconButton>
        <Image src={heart} alt='좋아요' width={30} height={30}></Image>
      </S.IconButton>
    </CommentUnit>
  );
});

const CommentUnit = styled(S.FlexRow)`
  justify-content: space-between;
  margin-bottom: 12px;
`;

const CommentDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 2;
`;

const CommentFlexRow = styled(S.FlexRow)`
  padding-top: 10px;
  padding-bottom: 6px;
`;

const RecommentButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${getColor('Grey/grey-600')};
`;

const DeleteButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${getColor('Grey/grey-600')};
`;

const CommentDate = styled.time<{ color: string }>`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.color};
`;
