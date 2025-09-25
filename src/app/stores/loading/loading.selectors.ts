import { createFeatureSelector } from "@ngrx/store";


export const selectLoadingState = createFeatureSelector<boolean>('loading');