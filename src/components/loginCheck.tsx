import { login } from '@/redux/userUid';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import firebase from '@/firebase/app';
import { getUserUid } from '@/firebase/utils';

interface state {
  userUid: { value: string };
}

export default function LoginCheck() {
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState('비로그인 상태');
  const userUid = useSelector((state: state) => state.userUid.value);
  useEffect(() => {
    dispatch(login());
  }, []);
  return <p className='a11y-hidden'>로그인 상태 : {userUid}/ </p>;
}
