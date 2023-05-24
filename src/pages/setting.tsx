import Edit from '@/components/editprofile/Edit';
import type { ReactElement } from 'react';
import { MenuBarLayout } from '@/components';

export default function Setting() {
  return (
    <>
      <Edit />
    </>
  );
}

// getLayout으로 해당 페이지에 필요한 레이아웃 적용
Setting.getLayout = function getLayout(page: ReactElement) {
  return <MenuBarLayout>{page}</MenuBarLayout>; // 공통 레이아웃만 적용
};
