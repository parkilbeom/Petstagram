import { app } from "../firebase/app.js";
import { Counter } from "../components/Counter.tsx";

console.log(app);

export default function Home() {
  return (
    <>
      홈화면입니다.
      <Counter />
    </>
  );
}
