import * as S from '../PostCard.styled';
import { Comment } from '@/components/InfiniteScroll/postList';

interface SimpleCommentUnitProps {
  data: Comment;
}

export function SimpleCommentUnit({ data }: SimpleCommentUnitProps) {
  return (
    <S.Comment>
      <S.InitialLink href='/main' passHref>
        <S.IdLink>{data.email.split('@')[0]}</S.IdLink>
      </S.InitialLink>
      <p>{data.content}</p>
    </S.Comment>
  );
}
