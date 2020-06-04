import { AuthService } from './services/auth-services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  // Inject Router so we can hand off the user to the Login Page
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.getUser();
    if (user && user.role === 'student') {
      return true;
    } else {
      // alert('You are not allowed to access this page');
      return true;
    }
  }
}
