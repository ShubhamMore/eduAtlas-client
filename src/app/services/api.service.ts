import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, Observable, Subject, from } from 'rxjs';
import {
  batchData,
  discountData,
  courseData,
  studentsData,
  instituteData,
  receiptData,
} from '../../assets/dataTypes/dataType';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // =====================INSTITUTE API==============================

  getInstitutes(): Observable<any[]> {
    return this.http
      .get<any[]>(environment.server + '/institute/all')
      .pipe(tap(), catchError(this.handleError));
  }

  getInstitute(id: string): Observable<any> {
    const url = `${environment.server}/institute/oneInstitute/${id}`;
    return this.http.get<instituteData>(url).pipe(
      tap((data) => {
        // console.log(data);
      }),
      catchError(this.handleError),
    );
  }

  addInstitute(institute) {
    // console.log('Institute - ', institute);
    const postData = new FormData();
    const data = {
      basicInfo: {
        name: institute.name,
        instituteContact: institute.instituteContact,
      },
      address: {
        addressLine: institute.address.addressLine,
        locality: institute.address.locality,
        state: institute.address.state,
        city: institute.address.city,
        pincode: institute.address.pincode,
      },
      category: institute.category,
      metaTag: institute.instituteMetaTag,
    };

    postData.append('basicInfo', JSON.stringify(data.basicInfo));
    postData.append('address', JSON.stringify(data.address));
    postData.append('metaTag', JSON.stringify(institute.instituteMetaTag));
    postData.append('category', JSON.stringify(institute.category));
    postData.append('logo', institute.logo, institute.name);
    return this.http
      .post<{ message: string }>(environment.server + '/institute/addInstitute', postData)
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        tap((data: any) => {
          // console.log(data);
        }),
        catchError(this.handleError),
      );
  }
  updateInstitute(id: string, institute: any): Observable<any> {
    const url = `${environment.server}/institute/updateInstitute/${id}`;

    const data = {
      basicInfo: {
        name: institute.name,
        instituteContact: +institute.instituteContact,
      },
      address: {
        addressLine: institute.address.addressLine,
        locality: institute.address.locality,
        state: institute.address.state,
        city: institute.address.city,
        pincode: institute.address.pincode,
      },
      category: institute.category,
      metaTag: institute.instituteMetaTag,
    };

    const postData = new FormData();
    postData.append('basicInfo', JSON.stringify(data.basicInfo));
    postData.append('address', JSON.stringify(data.address));
    postData.append('metaTag', JSON.stringify(institute.instituteMetaTag));
    postData.append('category', JSON.stringify(institute.category));
    postData.append('logo', institute.logo, institute.name);

    return this.http.put<{ message: string }>(url, postData).pipe(
      map(() => institute),
      catchError(this.handleError),
    );
  }
  deleteInstitute(id: string): Observable<void> {
    const url = environment.server + '/institute/' + id;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  // =====================STUDENT API===================

  getCourseTD(id: string) {
    const url = `${environment.server}/institute/getCourseTD/${id}`;
    return this.http.get<any[]>(url).pipe(
      tap((data) => {
        // console.log(data);
      }),
      catchError(this.handleError),
    );
  }

  getStudents(instituteId): Observable<any[]> {
    const url = `${environment.server}/institute/student/all/${instituteId}`;
    return this.http.get<any[]>(url).pipe(
      tap((data) => {
        // console.log(data);
      }),
      catchError(this.handleError),
    );
  }

  getOneStudentByInstitute(data: any) {
    return this.http
      .post(environment.server + '/institute/student/getOneStudentByInstitute', data)
      .pipe(
        tap((res) => {
          // console.log(res);
        }),
        map((res) => res),
        catchError(this.handleError),
      );
  }

  getStudent(data: any): Observable<any> {
    return this.http.post<any>(environment.server + '/institute/student/getStudent', data).pipe(
      tap((res) => {
        // console.log(res);
      }),
      map((res) => res.student),
      catchError(this.handleError),
    );
  }

  getActiveStudents(id: string, courseId: string, batchId: string) {
    const data = { instituteId: id, courseId };
    console.log(data);
    return this.http.post(environment.server + '/institute/student/getActiveStudents', data).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((data) => {
        // console.log(data);
      }),
      catchError(this.handleError),
    );
  }

  getPendingStudents(id: string, courseId: string) {
    const data = { instituteId: id, courseId };
    return this.http.post(environment.server + '/institute/student/getPendingStudents', data).pipe(
      tap((data) => {
      }),
      catchError(this.handleError),
    );
  }

  updateStudentCourse(student: any, instituteId: string) {
    const data = {
      eduAtlasId: 'EDU-2020-ST-100004',

      instituteDetails: {
        instituteId: instituteId,
        courseId: student.courseDetails.course,
        batchId: student.courseDetails.batch,
        discount: student.courseDetails.discount,
        additionalDiscount: student.courseDetails.additionalDiscount,
        nextPayble: student.courseDetails.netPayable,
        active: student.courseDetails.batch === '' ? false : true,
        materialRecord: student.materialRecord,
      },

      fee: {
        instituteId: instituteId,
        courseId: student.courseDetails.course,
        installmentNumber: student.feeDetails.installments,
        nextInstallment: student.feeDetails.nextInstallment,
        amountCollected: student.feeDetails.amountCollected,
        mode: student.feeDetails.mode,
      },
    };

    return this.http
      .post<{ message: string }>(environment.server + '/institute/student/updateStudent', data)
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        tap((data) => {
          // console.log(data);
        }),
        catchError(this.handleError),
      );
  }

  addStudent(student: any, instituteId: string): Observable<{ message: String }> {
    const data = {
      basicDetails: {
        name: student.name,
        rollNumber: student.rollNo,
        studentEmail: student.studentEmail,
        studentContact: student.contact,
      },
      parentDetails: {
        name: student.parentName,
        parentContact: student.parentContact,
        parentEmail: student.parentEmail,
        address: student.address,
      },
      instituteDetails: {
        instituteId: instituteId,
        courseId: student.courseDetails.course,
        batchId: student.courseDetails.batch,
        discount: student.courseDetails.discount,
        additionalDiscount: student.courseDetails.additionalDiscount,
        nextPayble: student.courseDetails.netPayable,
        active: student.courseDetails.batch === '' ? false : true,
        materialRecord: student.materialRecod,
      },

      fee: {
        instituteId: instituteId,
        courseId: student.courseDetails.course,
        installmentNumber: student.feeDetails.installments,
        nextInstallment: student.feeDetails.nextInstallment,
        amountCollected: student.feeDetails.amountCollected,
        mode: student.feeDetails.mode,
      },
    };

    return this.http
      .post<{ message: string }>(environment.server + '/institute/student/add', data)
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        tap((data) => {
          // console.log(data);
        }),
        catchError(this.handleError),
      );
  }

  updateStudent(student: any, studentMetaData: any): Observable<any> {
    const data = {
      instituteId: student.id,
      basicDetails: {
        name: student.name,
        rollNumber: student.rollNo,
        studentEmail: student.studentEmail,
        studentContact: student.contact,
      },
      parentDetails: {
        name: student.parentName,
        parentContact: student.parentContact,
        parentEmail: student.parentEmail,
        address: student.address,
      },
      courseDetails: {
        course: student.courseDetails.course,
        batch: student.courseDetails.batch,
        discount: student.courseDetails.discount,
        additionalDiscount: student.courseDetails.additionalDiscount,
        nextPayble: student.courseDetails.netPayable,
        active: student.courseDetails.batch === '' ? false : true,
        materialRecord: student.materialRecod,
      },
      fee: {
        installmentNumber: student.feeDetails.installments,
        nextInstallment: student.feeDetails.nextInstallment,
        amountCollected: student.feeDetails.amountCollected,
        mode: student.feeDetails.mode,
      },
    };
    return this.http.put<any>(environment.server + '/institute/student/updateStudent', data).pipe(
      map(() => student),
      catchError(this.handleError),
    );
  }

  deleteStudent(param): Observable<void> {
    return this.http
      .delete<void>(environment.server + '/institute/student/', {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }

  // ========================COURSE API=====================

  getCourses(id): Observable<any[]> {
    return this.http.get<any[]>(`${environment.server}/institute/course/all/${id}`).pipe(
      tap((data) => {
        // console.log(data);
      }),
      catchError(this.handleError),
    );
  }
  addCourse(id: string, course: any): Observable<any> {
    return this.http
      .post<any>(`${environment.server}/institute/course/addCourse/${id}`, course)
      .pipe(
        tap((data) => {
          // console.log(data);
        }),
        catchError(this.handleError),
      );
  }

  getCourse(params): Observable<any> {
    return this.http
      .get<any>(environment.server + '/institute/course/one', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  updateCourse(params, course): Observable<any> {
    return this.http
      .patch<any>(environment.server + '/institute/course/', course, {
        params: params,
      })
      .pipe(
        map(() => course),
        catchError(this.handleError),
      );
  }
  deleteCourse(param): Observable<void> {
    return this.http
      .delete<void>(environment.server + '/institute/course/course/', {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }

  // =====================BATCHES API=================

  getBatches(branchId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.server}/institute/course/batches/${branchId}`).pipe(
      tap((data) => {
        // console.log(data);
      }),
      catchError(this.handleError),
    );
  }

  getBatch(params): Observable<any> {
    return this.http
      .get<any>(environment.server + '/institute/course/batch/', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  addBatch(branchId: string, batch: any): Observable<batchData> {
    return this.http
      .post<batchData>(`${environment.server}/institute/course/addBatch/${branchId}`, batch)
      .pipe(
        tap((data) => {
          // console.log(data);
        }),
        catchError(this.handleError),
      );
  }
  deleteBatch(params): Observable<void> {
    return this.http
      .delete<void>(environment.server + '/institute/course/batch/', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }
  updateBatch(params, batch: batchData): Observable<any> {
    return this.http
      .patch<any>(environment.server + '/institute/course/batch/', batch, {
        params: params,
      })
      .pipe(
        map(() => batch),
        catchError(this.handleError),
      );
  }

  // =======================DISCOUNT API======================

  getDiscounts(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.server}/institute/course/discounts/${id}`).pipe(
      tap((data) => {
        // console.log(data);
      }),
      catchError(this.handleError),
    );
  }
  getDiscount(params): Observable<any> {
    return this.http
      .get<any>(environment.server + '/institute/course/discount', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  addDiscount(id: string, discount: any): Observable<any> {
    return this.http
      .post<any>(`${environment.server}/institute/course/addDiscount/${id}`, discount)
      .pipe(
        tap((data) => {
          // console.log(data);
        }),
        catchError(this.handleError),
      );
  }

  deleteDiscount(params): Observable<void> {
    return this.http
      .delete<void>(environment.server + '/institute/course/discount/', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  updateDiscount(params, discount): Observable<any> {
    return this.http
      .patch<any>(environment.server + '/institute/course/discount/', discount, {
        params: params,
      })
      .pipe(
        map(() => discount),
        catchError(this.handleError),
      );
  }

  // ==========================RECEIPT API====================

  getReceipt(id: string): Observable<any> {
    return this.http.get<any>(`${environment.server}/institute/course/reciept/${id}`).pipe(
      map((data) => data.reciept),
      catchError(this.handleError),
    );
  }

  addReceipt(id: string, receipt: any): Observable<receiptData> {
    receipt.id = null;
    return this.http
      .post<any>(`${environment.server}/institute/course/addReciept/${id}`, receipt)
      .pipe(
        tap((data) => {
          // console.log(data);
        }),
        catchError(this.handleError),
      );
  }
  updateReceipt(id: string, reciept): Observable<any> {
    const url = `${environment.server}/institute/course/reciept/${id}`;
    return this.http.patch<any>(url, reciept).pipe(
      map(() => reciept),
      catchError(this.handleError),
    );
  }

  deleteReceipt(id: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.server}/institute/course/reciept/${id}`)
      .pipe(catchError(this.handleError));
  }

  //
  display(show: boolean) {
    const display: boolean = show;
    return display;
  }

  private handleError(error: any) {
    // console.log(error);
    return throwError(error);
  }
}
