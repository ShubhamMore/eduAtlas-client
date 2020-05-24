import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    return throwError(error);
  }
}
