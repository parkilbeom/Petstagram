import { FollowList } from '@/components';

export function RecommendFollow() {
  const testImageObject = [
    {
      email: 'to06109@naver.com',
      profile_url:
        'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
      nickname: '멍뭉이1',
    },
    {
      email: 'bsw@naver.com',
      profile_url:
        'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
      nickname: '멍뭉이2',
    },
    {
      email: 'yesong@naver.com',
      profile_url:
        'https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg',
      nickname: '멍뭉이3',
    },
  ];

  return (
    <>
      {testImageObject.map((profile, index) => {
        return <FollowList key={index} profile={profile} />;
      })}
    </>
  );
}
