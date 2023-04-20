import { app } from "../firebase/app.js";
import { Counter } from "../components/Counter.tsx";

console.log(app);

export default function Home() {
  return (
    <>
      <Counter />
    </>
  );
}
