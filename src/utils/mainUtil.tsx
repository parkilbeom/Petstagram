import * as S from '@/components/PostCard/PostCard.styled';
import { CreateAtType } from '@/components/InfiniteScroll/postList';
import { User } from '@/components/InfiniteScroll/postList';
import baseProfile from '@/public/profile.jpg';

export const caculateTime = (date: number): string => {
  const postDate = date;
  const nowDate = Math.round(Date.now() / 1000);
  const diff = nowDate - postDate;

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];

  for (const time of times) {
    const betweenTime = Math.floor(diff / time.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${time.name}`;
    }
  }

  return '방금 전';
};

export function isCreateAtType(value: any): value is CreateAtType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'seconds' in value &&
    'nanoseconds' in value
  );
}

export const renderProfile = (postUserData: User | undefined) => {
  if (
    postUserData &&
    postUserData.profile_url &&
    postUserData.profile_url != ''
  ) {
    return (
      <S.StyledImage
        src={postUserData.profile_url}
        alt='프로필 사진'
        width={100}
        height={100}
        unoptimized
      />
    );
  }

  return (
    <S.StyledImage
      src={baseProfile}
      alt='프로필 사진'
      width={100}
      height={100}
    />
  );
};
