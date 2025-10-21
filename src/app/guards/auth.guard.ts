import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const router=inject(Router)
 const storedUser = localStorage.getItem("userInfo");
 if(storedUser){
   return true;
 }
 localStorage.setItem('redirectUrl', state['url']);
 return router.createUrlTree(['/main/login']);
 
};
