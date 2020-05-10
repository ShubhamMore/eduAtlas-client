import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class InstituteGuard implements CanActivate {
role = localStorage.getItem('role');
  // Inject Router so we can hand off the user to the Login Page 
  constructor(private router: Router) {}
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
       if ( localStorage.getItem("token") && this.role === 'institute'){
        
         console.log('InstituteGuard running', this.role);
         // Token from the LogIn is avaiable, so the user can pass to the route
         return true
       } else  {
           alert('You are not allowed to access this page'); 
         return false
 
       }


 
  }
}
