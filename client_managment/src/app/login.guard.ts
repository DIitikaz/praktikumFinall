import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  let x=localStorage.getItem('token');
  return x!=undefined
};
