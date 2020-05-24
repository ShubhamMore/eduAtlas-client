import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MENU_ITEMS } from './pages/pages-menu';

@Injectable({
  providedIn: 'root',
})
export class BranchManagerGuard implements CanActivate {
  role = localStorage.getItem('role');
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if ((localStorage.getItem('token') && this.role === 'branchManager') || 'institute') {
      // Token from the LogIn is avaiable, so the user can pass to the route
      return true;
    } else {
      alert('You are not allowed to access this page');
      return false;
    }
  }
}
