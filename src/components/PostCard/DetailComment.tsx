import * as S from './PostCard.styled';
import { Comment } from '@/components/InfiniteScroll/postList';
import { DetailCommentUnit } from '@/components/index';
import { getColor } from '@/theme/utils';
import { useState, forwardRef, RefObject } from 'react';
import styled from 'styled-components';

interface DetailCommentProps {
  postId: string;
  data: Comment;
  index: number;
  onClickRecomment: (index: number) => void;
}

export const DetailComment = forwardRef<HTMLInputElement, DetailCommentProps>(
  function DetailComment({ postId, data, index, onClickRecomment }, ref) {
    const [isView, setIsView] = useState<boolean>(false);

    const handleView = () => {
      setIsView(() => !isView);
    };
    return (
      <>
        <DetailCommentUnit
          postId={postId}
          data={data}
          commentIndex={index}
          onClickRecomment={onClickRecomment}
          inputRef={ref as RefObject<HTMLInputElement>}
        ></DetailCommentUnit>
        <RecommentSection>
          {data.recomment.length != 0 ? (
            <S.MoreCommentButton
              color={getColor('Grey/grey-700')}
              onClick={handleView}
            >
              {isView ? (
                <span>답글 숨기기</span>
              ) : (
                <span>답글 보기 &#40;{data.recomment.length}개&#41;</span>
              )}
            </S.MoreCommentButton>
          ) : null}
          {isView
            ? data.recomment.map((recommentData, recommentIndex) => {
                return (
                  <DetailCommentUnit
                    postId={postId}
                    data={recommentData}
                    commentIndex={index}
                    onClickRecomment={onClickRecomment}
                    inputRef={ref as RefObject<HTMLInputElement>}
                    recommentIndex={recommentIndex}
                  />
                );
              })
            : null}
        </RecommentSection>
      </>
    );
  }
);

const RecommentSection = styled.div`
  margin-left: 65px;
`;
