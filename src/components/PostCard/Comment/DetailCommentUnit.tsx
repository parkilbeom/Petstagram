import * as S from '../PostCard.styled';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Comment } from '@/components/InfiniteScroll/postList';
import { renderProfile, caculateTime } from '@/utils/mainUtil';
import { User } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';
import Image from 'next/image';
import heart from '@/public/icons/PostCard/heart.png';
import { getColor } from '@/theme/utils';

interface DetailCommentUnitProps {
  data: Comment;
}

export function DetailCommentUnit({ data }: DetailCommentUnitProps) {
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
            <RecommentButton color={getColor('Grey/grey-600')}>
              좋아요 {data.like.length}개
            </RecommentButton>
          ) : null}
          <RecommentButton color={getColor('Grey/grey-600')}>
            답글 달기
          </RecommentButton>
        </S.FlexRow>
      </CommentDiv>
      <S.IconButton>
        <Image src={heart} alt='좋아요' width={30} height={30}></Image>
      </S.IconButton>
    </CommentUnit>
  );
}

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

const RecommentButton = styled.button<{ color: string }>`
  all: unset;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.color};
`;

const CommentDate = styled.time<{ color: string }>`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.color};
`;
