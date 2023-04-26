import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counter";

interface State {
  counter: { value: number };
}

export function Counter() {
  const count = useSelector((state: State) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
