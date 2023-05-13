import * as S from './PostCard.styled';

interface LikeListProps {
  likeEmail: string[];
}

export function LikeList({ likeEmail }: LikeListProps) {
  return (
    <S.LikeList>
      <S.InitialLink href='/main' passHref>
        <S.IdLink>{likeEmail[0] ? likeEmail[0].split('@')[0] : null}</S.IdLink>
      </S.InitialLink>
      {likeEmail.length > 1 ? (
        <p>
          님 외 <strong>{likeEmail.length - 1}</strong> 명이 좋아합니다
        </p>
      ) : (
        <p>님이 좋아합니다</p>
      )}
    </S.LikeList>
  );
}
