import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getInstitutesOfStudent(id: string) {
    return this.http
      .post(environment.server + '/institute/student/getInstitutesOfStudent', { _id: id })
      .pipe(tap(), catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
