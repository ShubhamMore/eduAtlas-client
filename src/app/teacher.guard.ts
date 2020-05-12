import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard implements CanActivate {
  role: string = localStorage.getItem('role');
  // Inject Router so we can hand off the user to the Login Page
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token') && this.role === 'teacher') {
      console.log('TeacherGuard running', this.role);

      return true;
    } else {
      alert('You are not allow to access this page');
      return false;
    }
  }
}
