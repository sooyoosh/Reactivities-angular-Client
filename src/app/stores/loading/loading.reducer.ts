import { createReducer, on } from "@ngrx/store";
import * as LoadingActions from '../loading/loading.actions'
import { state } from "@angular/animations";

export const initialState:boolean=false;


export const loadingReducer=createReducer(
initialState,
on(LoadingActions.show,state=>true),
on(LoadingActions.hide,state=>false),



)