import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import { increment, decrement } from '../redux/counter';

export function Counter() {
  const count = useSelector((state: RootState) => state);
  console.log(count);
  const dispatch = useDispatch();

  return (
    <div>
      하하하
      <button onClick={() => dispatch(increment())}>+</button>
      {/* <span>{count}</span> */}
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
