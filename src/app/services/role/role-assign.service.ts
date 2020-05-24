import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleAssignService {
  constructor(private http: HttpClient) {}

  addRole(role: any) {
    return this.http.post(`${environment.server}/institute/role`, role).pipe(
      tap((res) => {}),
      catchError(this.handleError),
    );
  }

  getOtp(phone: any, params: any) {
    return this.http.get(`${environment.server}/users/sendOTP/${phone}`, { params: params }).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  verifyOtp(params: any) {
    return this.http.get(environment.server + '/users/verifyOTP', { params: params }).pipe(
      tap((res) => {}),
      catchError((err) => this.handleError(err)),
    );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
