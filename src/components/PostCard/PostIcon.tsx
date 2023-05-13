import * as S from './PostCard.styled';

import Image from 'next/image';

import heart from '@/public/icons/PostCard/heart.png';
import comment from '@/public/icons/PostCard/comment.png';
import send from '@/public/icons/PostCard/send.png';
import bookmark from '@/public/icons/PostCard/bookmark.png';

export function PostIcon() {
  return (
    <S.IconSection>
      <S.FlexRow>
        <S.IconButton>
          <Image src={heart} alt='좋아요' width={40} height={40}></Image>
        </S.IconButton>
        <S.IconButton>
          <Image src={comment} alt='댓글' width={40} height={40}></Image>
        </S.IconButton>
        <S.IconButton>
          <Image src={send} alt='개인메세지' width={40} height={40}></Image>
        </S.IconButton>
      </S.FlexRow>
      <S.IconButton>
        <Image src={bookmark} alt='게시물저장' width={40} height={40}></Image>
      </S.IconButton>
    </S.IconSection>
  );
}
