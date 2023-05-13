// lib/postList.ts
import firebase from '@/firebase/app';

interface Recomment {
  user_uid: string;
  email: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue;
  like: string[];
}

export interface Comment {
  user_uid: string;
  email: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue;
  like: string[];
  recomment: Recomment[];
}

interface Image {
  src: string;
  alt: string;
}

export type CreateAtType = {
  seconds: number;
  nanoseconds: number;
};

export type Post = {
  user_uid: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue | CreateAtType;
  images: Image[];
  like: string[];
  comment: Comment[];
};

export interface User {
  name: string;
  nickname: string;
  email: string;
  post_uid: string[] | null;
  introduce: string | null;
  profile_url: string;
  phone: string | null;
  followers: string[] | null;
  following: string[];
  scrap: string[] | null;
}
