import { useState, useCallback, useMemo } from 'react';
import { getStorage, uploadBytes, ref } from 'firebase/storage';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';
import { User } from '@/components/InfiniteScroll/postList';
import { db } from './app';
import firebase, { usersRef } from '@/firebase/app';
import { Post } from '@/components/InfiniteScroll/postList';

// 파이어스토어로 데이터 보내는 함수 (콜렉션 이름,넣을 객체)
export function pushData(collection: string, object: object) {
  db.collection(collection)
    .add(object)
    .then(() => console.log('Data successfully written!'))
    .catch(() => console.error('Error writing data: '));
}

// 파이어스토어로 데이터 보내는 함수 (콜렉션 이름,넣을 객체)
export function pushTestData(collection: string, object: Post) {
  object['createAt'] = serverTimestamp();
  object['comment'].forEach((comment, index) => {
    object['comment'][index]['createAt'] = new Date().toISOString();

    comment['recomment']?.forEach((recomment, index) => {
      comment['recomment'][index]['createAt'] = new Date().toISOString();
    });
  });

  db.collection(collection)
    .add(object)
    .then(() => console.log('Data successfully written!'))
    .catch(() => console.error('Error writing data: '));
}

// 파이어스토에서 데이터 받아오는 함수  (콜렉션 이름),(도큐먼트이름) 도큐먼트 없어도 사용가능
export const getData = async (collectionName: string, docName?: string) => {
  return new Promise((resolve, reject) => {
    if (docName) {
      const userInfoRef = db.collection(collectionName).doc(docName);
      userInfoRef
        .get()
        .then((doc) => {
          resolve(doc.data());
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      const querySnapshot = getDocs(collection(db, collectionName));
      querySnapshot
        .then((snapshot) => {
          const data = snapshot.docs;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

// 파이어베이스 데이터베이스에 데이터 보내는 함수 (보낼 파일, 경로, 저장 할 파일의 이름)
// 데이터베이스에 경로/저장 할 파일의 이름 으로 파일이 저장 됨
export const pushFile = (file: File, src: string, imageName: string) => {
  const storage = getStorage();
  const mountainRef = ref(storage, `${src}/${imageName}`);
  uploadBytes(mountainRef, file);
};

// 파이어베이스 로그인 유저 uid 받아오기
export const getUserUid = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(1);
        console.log('로그아웃상태');
      }
    });
  });
};
//  파이어베이스 업데이트 독 함수 (원래 있는 문서에 일부 객체만 업데이트 하기)
//  콜렉션 < 도큐먼트에 있는 오브젝트 {} 업데이트 할게~
export const updateData = (
  collection: string,
  documentname: string,
  object: object
) => {
  const userRef = doc(db, collection, documentname);
  updateDoc(userRef, object);
};
