import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private student: any;

  setStudent(student: any) {
    this.student = student;
  }

  getStudent() {
    return this.student;
  }

  constructor(private http: HttpClient) {}

  getInstitutesOfStudent(id: string) {
    return this.http
      .post(environment.server + '/institute/student/getInstitutesOfStudent', { _id: id })
      .pipe(tap(), catchError(this.handleError));
  }

  getInstitutesDashboardDataForStudent(instituteId: string) {
    return this.http
      .post(environment.server + '/institute/student/getInstitutesDashboardDataForStudent', {
        _id: this.student._id,
        instituteId,
      })
      .pipe(tap(), catchError(this.handleError));
  }

  getStudyMaterialForStudent(data: any) {
    return this.http
      .post(environment.server + '/institute/studyMaterial/getStudyMaterialForStudent', data)
      .pipe(tap(), catchError(this.handleError));
  }

  getStudentAllCoursesByInstitute(instituteId: any) {
    return this.http
      .post(environment.server + '/institute/student/getStudentAllCoursesByInstitute', {
        _id: this.student._id,
        instituteId,
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError),
      );
  }

  getStudentCoursesByInstitutes(instituteId: string) {
    return this.http
      .post(environment.server + '/institute/student/getStudentCoursesByInstitutes', {
        _id: this.student._id,
        instituteId,
      })
      .pipe(
        map((res: any[]) => {
          const courses = [];
          res.forEach((inst: any) => {
            const course = {
              _id: inst.course._id,
              courseName: inst.course.name,
              courseCode: inst.course.courseCode,
              batchId: inst.batch._id,
              batchCode: inst.batch.batchCode,
            };
            courses.push(course);
          });
          return courses;
        }),
        catchError(this.handleError),
      );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
