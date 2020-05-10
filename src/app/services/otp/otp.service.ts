import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}
  getOtp(phone, param) {
    return this.http
      .get<any>(`${environment.server}/users/sendOTP/${phone}`, { params: param })
      .pipe(
        tap((res: any) => console.log(res)),
        catchError(this.handleError)
      );
  }
  varifyOtp(params, password) {
    return this.http
      .patch<any>(environment.server + '/users/resetPassword', password, { params: params })
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError)
      );
  }
  setPassword(params, data): Observable<any> {
    const password = { password: data.password, phone: data.phone };
    return this.http
      .patch<any>(environment.server + '/users/resetPassword', password, { params: params })
      .pipe(catchError(this.handleError));
  }
  userVarify(param) {
    return this.http.get(environment.server + '/users/varifyOTP', { params: param }).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
}
