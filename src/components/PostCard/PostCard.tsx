import React from 'react';
import { ImageSwiper } from './ImageSwiper';

const testImageObject = [
  {
    src: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    alt: '멍뭉이1',
  },
  {
    src: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
    alt: '멍뭉이2',
  },
  {
    src: 'https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg',
    alt: '멍뭉이3',
  },
];

export function PostCard() {
  return (
    <>
      <div>포스트카드 컴포넌트</div>
      <ImageSwiper images={testImageObject} />
    </>
  );
}
