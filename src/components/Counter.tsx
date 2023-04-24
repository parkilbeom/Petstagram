import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counter";

interface state {
  counter: { value: number };
}

export function Counter() {
  const count = useSelector((state: state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
