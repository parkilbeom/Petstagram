import * as S from '../PostCard.styled';
import { getColor } from '@/theme/utils';

import imoge from '@/public/icons/PostCard/imoge.svg';
import Image from 'next/image';
import { useState, forwardRef } from 'react';
import { Post } from '@/components/InfiniteScroll/postList';
import { getData, updateData } from '@/firebase/utils';
import { useSelector } from 'react-redux';
import { userUidState, userDataState } from '@/types/index';

interface PostCardProps {
  postId: string;
  index?: number | null;
  onClickRecomment: (index: number | null) => void;
}

export const AddComment = forwardRef<HTMLInputElement, PostCardProps>(
  function AddComment({ postId, index, onClickRecomment }, inputRef) {
    const userUid = useSelector((state: userUidState) => state.userUid.value);
    const userInfo = useSelector((state: userDataState) => {
      const { isLoading, error, data } = state.userData;
      return { isLoading, error, data };
    });

    const [content, setContent] = useState<string>('');

    const updatePost = async () => {
      const result = (await getData('posts', postId)) as Post;
      if (result) {
        if (index) {
          // 답글 게시
          result.comment[index].recomment.push({
            content: content,
            createAt: new Date().toISOString(),
            email: userInfo.data.email,
            like: [],
            user_uid: userUid,
          });
        } else {
          // 댓글 게시
          result.comment.push({
            content: content,
            createAt: new Date().toISOString(),
            email: userInfo.data.email,
            like: [],
            recomment: [],
            user_uid: userUid,
          });
        }

        updateData('posts', postId, result);
      }
    };

    const updateComment = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updatePost();
      setContent('');
      onClickRecomment(null);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    };

    return (
      <S.FlexRow>
        <S.FlexRowGrow as='form' onSubmit={updateComment}>
          <S.CommentInput
            type='text'
            placeholder='댓글 달기...'
            color={getColor('Grey/grey-700')}
            onChange={handleInput}
            value={content}
            ref={inputRef}
          ></S.CommentInput>
          <S.AddCommentButton type='submit' color={getColor('point color')}>
            게시
          </S.AddCommentButton>
        </S.FlexRowGrow>
        <S.IconButton>
          <Image src={imoge} alt='이모티콘' width={18.5} height={18.5}></Image>
        </S.IconButton>
      </S.FlexRow>
    );
  }
);
