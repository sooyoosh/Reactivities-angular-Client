import {createReducer, on} from '@ngrx/store'
import * as CounterActions from './counter.actions'
//initial state

export interface CounterState {
  title: string;
  counter: number;
  events:string[]
}

export const initialState: CounterState = {
  title: 'Counter Store',
  counter: 0,
  events:[]
};


export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, state => ({
    ...state,
    counter: state.counter + 1,
     events: [...state.events, `increment by 1 - count is now ${state.counter + 1}`]
  })),
  on(CounterActions.decrement, state => ({
    ...state,
    counter: state.counter - 1,
    events: [...state.events, `decrement by 1 - count is now ${state.counter - 1}`]
  })),
  on(CounterActions.reset, state => ({
    ...state,
    counter: 0
  })),
  on(CounterActions.changeTitle, (state, { title }) => ({
    ...state,
    title
  })),
  on(CounterActions.incrementMyValue, (state, {val}) => ({
    ...state,
    counter:state.counter + val,
    events:[...state.events,`increment by ${val} - count is now ${state.counter + 1}`]
  }))
);