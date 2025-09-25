import { createAction, props } from "@ngrx/store";

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
export const incrementMyValue = createAction('[Counter] Increment By Value',
    props<{val:number}>());

export const changeTitle = createAction(
  '[Counter] Change Title',
  props<{ title: string }>()
);