import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}
  postAnnouncement(announcement: any) {
    return this.http.post(`${environment.server}/institute/announcement`, announcement).pipe(
      tap((response) => {}),
      catchError((err) => this.handleError(err)),
    );
  }

  getAnnouncement(id: any): Observable<any> {
    return this.http.get(`${environment.server}/users/announcement/${id}`).pipe(
      tap((res) => {}),
      catchError((err) => this.handleError(err)),
    );
  }

  deleteAnnouncement(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.server}/users/announcement/${id}`).pipe(
      tap((res) => {}),
      catchError((err) => this.handleError(err)),
    );
  }

  handleError(error: any) {
    return throwError(error);
  }
}
