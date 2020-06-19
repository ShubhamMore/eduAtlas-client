import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}
  getOtp(phone: any, email: any) {
    return this.http.get<any>(`${environment.server}/users/sendOTP/${phone}/${email}`).pipe(
      tap((res: any) => {
        // console.log(res);
      }),
      catchError(this.handleError),
    );
  }

  getOtpForRegisteredUser(phone: any, param: any) {
    return this.http
      .get<any>(`${environment.server}/users/sendOtpForRegisteredUser/${phone}`, { params: param })
      .pipe(
        tap((res: any) => {
          // console.log(res);
        }),
        catchError(this.handleError),
      );
  }

  verifyOtp(data: any) {
    return this.http.post<any>(environment.server + '/users/verifyOTP', data).pipe(
      tap((res: any) => {
        // console.log(res);
        return res;
      }),
      catchError(this.handleError),
    );
  }

  setPassword(data: any): Observable<any> {
    return this.http.patch<any>(environment.server + '/users/resetPassword', data).pipe(
      tap((res: any) => {
        // console.log(res);
      }),
      catchError(this.handleError),
    );
  }

  userVerify(data: any) {
    return this.http.post(environment.server + '/users/verifyUserOTP', data).pipe(
      tap((res: any) => {
        // console.log(res);
        return res;
      }),
      catchError(this.handleError),
    );
  }

  private handleError(error: any) {
    // console.log(error);
    return throwError(error);
  }
}
