import * as S from './PostCard.styled';

import React from 'react';
import Image from 'next/image';
import { User } from '@/components/InfiniteScroll/postList';

import moreVertical from '@/public/icons/PostCard/moreVertical.png';
import { renderProfile } from '@/utils/mainUtil';

interface PostHeaderProps {
  props: {
    postUserData: User | undefined;
    postUserId: string | undefined;
    postDateP?: string;
  };
}

export function PostHeader({ props }: PostHeaderProps) {
  const { postUserData, postUserId, postDateP } = props;

  return (
    <S.HeaderSection>
      <S.StyledDiv>
        <S.ProfileButton>{renderProfile(postUserData)}</S.ProfileButton>
        <S.ProfileId>{postUserId}</S.ProfileId>
        {postDateP ? <S.PostDate>{postDateP}</S.PostDate> : null}
      </S.StyledDiv>
      <S.IconButton>
        <Image src={moreVertical} alt='더보기' width={27} height={27}></Image>
      </S.IconButton>
    </S.HeaderSection>
  );
}
