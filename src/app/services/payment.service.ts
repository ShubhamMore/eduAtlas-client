import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, Observable, Subject, from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  generateOrder(id: string, options: any): Observable<any[]> {
    return this.http
      .post<any[]>(environment.server + '/institute/payment/orderGenerate/' + id, options)
      .pipe(tap(), catchError(this.handleError));
  }

  verifyPayment(id: string, payment: any): Observable<any[]> {
    return this.http
      .post<any[]>(environment.server + '/institute/payment/verifyPayment/' + id, payment)
      .pipe(tap(), catchError(this.handleError));
  }

  private handleError(error: any) {
    // console.log(error);
    return throwError(error);
  }
}
