import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  addSchedule(schedule: any) {
    return this.http.post(`${environment.server}/institute/schedule`, schedule).pipe(
      tap((res) => {}),
      catchError(this.handleError),
    );
  }

  getSchedule(params: any) {
    return this.http
      .get(`${environment.server}/institute/schedule/`, {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
