interface User {
  name: string;
  nickname: string;
  email: string;
  post_uid: string[] | null;
  introduce: string | null;
  profile_url: string | null;
  phone: string | null;
  followers: string[] | null;
  following: string[] | null;
  scrap: string[] | null;
}

interface Comment {
  user_uid: string;
  content: string;
  createAt: string;
  like: string[];
  recomment: Recomment[];
}

interface Recomment {
  user_uid: string;
  content: string;
  createAt: string;
  like: string[];
}

interface Post {
  uid: string;
  user_uid: string;
  content: string;
  createAt: string;
  images: string[];
  like: string[];
  comment: Comment[];
}
