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

interface signupType {
  name: string;
  phonenumber: number;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public token = new Subject<any>();
  myToken: string;
  authToken = localStorage.getItem('token');

  //headers = new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json');
  addToken() {
    this.getToken().subscribe((token) => {
      this.authToken = token;

      console.log('authToken======>', this.authToken);
    });
  }
  headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authToken);

  httpOptions = {
    headers: this.headers,
  };
  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    return this.token.asObservable();
  }
  //=============================================INSTITUTE API=============================================================

  getInstitutes(): Observable<any[]> {
    return this.http
      .get<any[]>(environment.server + '/institute/all', this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  getInstitute(id: string): Observable<any> {
    const url = `${environment.server}/institute/oneInstitute/${id}`;
    return this.http.get<instituteData>(url, this.httpOptions).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError),
    );
  }

  // addInstitute(institute:instituteData):Observable<instituteData>{
  //   institute.id = null;
  //   return this.http.post<instituteData>(this.apiUrl[0],institute,this.httpOptions).pipe(
  //     tap(data => console.log(data)),
  //     catchError(this.handleError)
  //     );
  // }

  addInstitute(institute) {
    console.log('Institute - ', institute);
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
      .post<{ message: string }>(
        environment.server + '/institute/addInstitute',
        postData,
        this.httpOptions,
      )
      .pipe(
        tap((data) => console.log(data)),
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

    return this.http.put<{ message: string }>(url, postData, this.httpOptions).pipe(
      map(() => institute),
      catchError(this.handleError),
    );
  }
  deleteInstitute(id: string): Observable<void> {
    const url = environment.server + '/institute/' + id;
    return this.http.delete<void>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  //=====================================STUDENT API==============================================================

  getCourseTD(id: string) {
    const url = `${environment.server}/institute/getCourseTD/${id}`;
    return this.http.get<any[]>(url, this.httpOptions).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError),
    );
  }

  getStudents(instituteId): Observable<any[]> {
    const url = `${environment.server}/institute/student/all/${instituteId}`;
    return this.http.get<any[]>(url, this.httpOptions).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError),
    );
  }

  getStudent(params): Observable<any> {
    return this.http
      .get<any>(environment.server + '/institute/student/', {
        params: params,
        headers: this.headers,
      })
      .pipe(
        tap((data) => console.log(data)),
        map((data) => data.student),
        catchError(this.handleError),
      );
  }

  addStudent(student): Observable<{ message: String }> {
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
      },
      fee: {
        installmentNumber: student.feeDetails.installments,
        nextInstallment: student.feeDetails.nextInstallment,
        amountCollected: student.feeDetails.amountCollected,
        mode: student.feeDetails.mode,
      },
      // materialRecord:student.materialRecord
    };

    return this.http
      .post<{ message: string }>(
        environment.server + '/institute/student/add',
        data,
        this.httpOptions,
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }

  updateStudent(params, student: any): Observable<any> {
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
      },
      fee: {
        installmentNumber: student.feeDetails.installments,
        nextInstallment: student.feeDetails.nextInstallment,
        amountCollected: student.feeDetails.amountCollected,
        mode: student.feeDetails.mode,
      },
    };
    return this.http
      .put<any>(environment.server + '/institute/student/', data, {
        params: params,
        headers: this.headers,
      })
      .pipe(
        map(() => student),
        catchError(this.handleError),
      );
  }

  deleteStudent(param): Observable<void> {
    return this.http
      .delete<void>(environment.server + '/institute/student/', {
        params: param,
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  //============================================COURSE API============================================================

  getCourses(id): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.server}/institute/course/all/${id}`, this.httpOptions)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }
  addCourse(id: string, course: any): Observable<any> {
    return this.http
      .post<any>(`${environment.server}/institute/course/addCourse/${id}`, course, this.httpOptions)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }

  getCourse(params): Observable<any> {
    return this.http
      .get<any>(environment.server + '/institute/course/one', {
        params: params,
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }
  updateCourse(params, course): Observable<any> {
    return this.http
      .patch<any>(environment.server + '/institute/course/', course, {
        params: params,
        headers: this.headers,
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
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  //============================================BATCHES API============================================================

  getBatches(branchId: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.server}/institute/course/batches/${branchId}`, this.httpOptions)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }
  getBatch(params): Observable<any> {
    return this.http
      .get<any>(environment.server + '/institute/course/batch/', {
        params: params,
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }
  addBatch(branchId: string, batch: any): Observable<batchData> {
    return this.http
      .post<batchData>(
        `${environment.server}/institute/course/addBatch/${branchId}`,
        batch,
        this.httpOptions,
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }
  deleteBatch(params): Observable<void> {
    return this.http
      .delete<void>(environment.server + '/institute/course/batch/', {
        params: params,
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }
  updateBatch(params, batch: batchData): Observable<any> {
    return this.http
      .patch<any>(environment.server + '/institute/course/batch/', batch, {
        params: params,
        headers: this.headers,
      })
      .pipe(
        map(() => batch),
        catchError(this.handleError),
      );
  }

  //============================================DISCOUNT API============================================================

  getDiscounts(id: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.server}/institute/course/discounts/${id}`, this.httpOptions)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }
  getDiscount(params): Observable<any> {
    return this.http
      .get<any>(environment.server + '/institute/course/discount', {
        params: params,
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  addDiscount(id: string, discount: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.server}/institute/course/addDiscount/${id}`,
        discount,
        this.httpOptions,
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }

  deleteDiscount(params): Observable<void> {
    return this.http
      .delete<void>(environment.server + '/institute/course/discount/', {
        params: params,
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }
  updateDiscount(params, discount): Observable<any> {
    return this.http
      .patch<any>(environment.server + '/institute/course/discount/', discount, {
        params: params,
        headers: this.headers,
      })
      .pipe(
        map(() => discount),
        catchError(this.handleError),
      );
  }

  //============================================RECEIPT API============================================================

  getReceipt(id: string): Observable<any> {
    return this.http
      .get<any>(`${environment.server}/institute/course/reciept/${id}`, this.httpOptions)
      .pipe(
        map((data) => data.reciept),
        catchError(this.handleError),
      );
  }

  addReceipt(id: string, receipt: any): Observable<receiptData> {
    receipt.id = null;
    return this.http
      .post<any>(
        `${environment.server}/institute/course/addReciept/${id}`,
        receipt,
        this.httpOptions,
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
      );
  }
  updateReceipt(id: string, reciept): Observable<any> {
    const url = `${environment.server}/institute/course/reciept/${id}`;
    return this.http.patch<any>(url, reciept, this.httpOptions).pipe(
      map(() => reciept),
      catchError(this.handleError),
    );
  }

  deleteReceipt(id: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.server}/institute/course/reciept/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //
  display(show: boolean) {
    const display: boolean = show;
    return display;
  }
  // private handleError<T>(operation = 'operation', result?: T) {

  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);

  //     return of(result as T);
  //   };
  // }
  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
  private log(message: string) {
    console.log(message);
  }
}
