
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, finalize } from 'rxjs';
import { selectLoadingState } from '../stores/loading/loading.selectors';
import * as LoadingActions from '../stores/loading/loading.actions'


export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
const store=inject(Store);
const loading$=store.select(selectLoadingState);

    store.dispatch(LoadingActions.show());
  return next(req).pipe(
    delay(200),
    finalize(()=>{
      store.dispatch(LoadingActions.hide());
    })
  );
  
};
