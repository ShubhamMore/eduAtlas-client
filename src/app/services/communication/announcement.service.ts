import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  authToken = localStorage.getItem('token');

  headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authToken);

  httpOptions = {
    headers: this.headers,
  };
  constructor(private http: HttpClient) {}
  postAnnouncement(announcement) {
    return this.http
      .post(`${environment.server}/institute/announcement`, announcement, this.httpOptions)
      .pipe(
        tap((response) => {
          // console.log(response);
        }),
        catchError((err) => this.handleError(err)),
      );
  }
  getAnnouncement(id): Observable<any> {
    return this.http
      .get<any>(`${environment.server}/users/announcement/${id}`, this.httpOptions)
      .pipe(
        tap((res) => {
          // console.log(res);
        }),
        catchError((err) => this.handleError(err)),
      );
  }
  deleteAnnouncement(id): Observable<any> {
    return this.http
      .delete<any>(`${environment.server}/users/announcement/${id}`, this.httpOptions)
      .pipe(
        tap((res) => {
          // console.log(res);
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  handleError(error: any) {
    return throwError(error);
  }
}
