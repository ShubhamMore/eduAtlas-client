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

  deleteOrder(id: string) {
    return this.http
      .post(environment.server + '/institute/payment/deleteOrder/', { _id: id })
      .pipe(tap(), catchError(this.handleError));
  }

  generateOrder(order: any) {
    return this.http
      .post(environment.server + '/institute/payment/orderGenerate/', order)
      .pipe(tap(), catchError(this.handleError));
  }

  verifyPayment(payment: any, placedOrder: any) {
    return this.http
      .post(environment.server + '/institute/payment/verifyPayment/', {
        payment,
        receipt: placedOrder,
      })
      .pipe(tap(), catchError(this.handleError));
  }

  private handleError(error: any) {
    // console.log(error);
    return throwError(error);
  }
}
