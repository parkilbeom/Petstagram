import * as S from '../PostCard.styled';
import { getColor } from '@/theme/utils';

import imoge from '@/public/icons/PostCard/imoge.svg';
import Image from 'next/image';

export function AddComment() {
  return (
    <S.FlexRow>
      <S.CommentInput
        type='text'
        placeholder='댓글 달기...'
        color={getColor('Grey/grey-700')}
      ></S.CommentInput>
      <S.AddCommentButton color={getColor('point color')}>
        게시
      </S.AddCommentButton>
      <S.IconButton>
        <Image src={imoge} alt='이모티콘' width={18.5} height={18.5}></Image>
      </S.IconButton>
    </S.FlexRow>
  );
}
