import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.reducer";




export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCounter = createSelector(
  selectCounterState,
  state => state.counter
);

export const selectTitle = createSelector(
  selectCounterState,
  state => state.title
);
export const selectEvents = createSelector(
  selectCounterState,
  state => state.events
);