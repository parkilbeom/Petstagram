import { combineReducers } from 'redux';
import counterReduce from '../redux/counter';

const rootReducer = combineReducers({
  counterReduce,
});

export default rootReducer;

// ('CombinedState<{ counterReduce: CounterState; }>');
// const rootReducer: Reducer<
//   CombinedState<{
//     todoReducer: never;
//   }>,
//   ActionType
// >;

export type RootState = ReturnType<typeof rootReducer>;
