import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/modules";
import { increment, decrement } from "../redux/counter";

export function Counter() {
  const count = useSelector((state: RootState) => state.counterReduce.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
