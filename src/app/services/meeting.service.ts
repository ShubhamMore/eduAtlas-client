import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  constructor(private http: HttpClient) {}

  getAllMeetingLinks() {
    const url = `${environment.server}/institute/zoom/getAllMeetingLinks`;
    return this.http.post(url, {}).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  deleteMeetingLink(data) {
    const url = `${environment.server}/institute/zoom/deleteMeetingLink`;
    return this.http.post(url, data).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  updateMeetingLink(data) {
    const url = `${environment.server}/institute/zoom/updateMeetingLink`;
    return this.http.post(url, data).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  createMeetingLink(data) {
    const url = `${environment.server}/institute/zoom/createMeetingLink`;
    return this.http.post(url, data).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  getOneMeetingLink(data) {
    const url = `${environment.server}/institute/zoom/getOneMeetingLink`;
    return this.http.post(url, data).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  getMeetingLinkByBatch(data: any) {
    const url = `${environment.server}/institute/zoom/getMeetingLinks`;
    return this.http.post(url, data).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
