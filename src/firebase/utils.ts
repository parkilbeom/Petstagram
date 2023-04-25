import { getStorage, uploadBytes, ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./app";

// 파이어스토어로 데이터 보내는 함수 (콜렉션 이름,넣을 객체)
export function pushData(collection: string, object: object) {
  db.collection(collection)
    .add(object)
    .then(() => console.log("Data successfully written!"))
    .catch(() => console.error("Error writing data: "));
}
// 파이어스토에서 데이터 받아오는 함수  (콜렉션 이름)
export const getData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc) => doc.data());
  console.log(data);
};

// 파이어베이스 데이터베이스에 데이터 보내는 함수 (보낼 파일, 경로, 저장 할 파일의 이름)
// 데이터베이스에 경로/저장 할 파일의 이름 으로 파일이 저장 됨
export const pushFile = (file: File, src: string, imageName: string) => {
  const storage = getStorage();
  const mountainRef = ref(storage, `${src}/${imageName}`);
  uploadBytes(mountainRef, file);
};
