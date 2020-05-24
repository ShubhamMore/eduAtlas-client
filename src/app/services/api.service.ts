import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { batchData, instituteData } from '../../assets/dataTypes/dataType';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // =====================INSTITUTE API==============================

  getInstitutes() {
    return this.http
      .get(environment.server + '/institute/all')
      .pipe(tap(), catchError(this.handleError));
  }

  getInstitute(id: string) {
    const url = `${environment.server}/institute/oneInstitute/${id}`;
    return this.http.get<instituteData>(url).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  addInstitute(institute: any) {
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
    return this.http.post(environment.server + '/institute/addInstitute', postData).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((data: any) => {}),
      catchError(this.handleError),
    );
  }

  updateInstitute(id: string, institute: any) {
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

    if (institute.logo) {
      postData.append('logo', institute.logo, institute.name);
    }

    return this.http.put(url, postData).pipe(
      map(() => institute),
      catchError(this.handleError),
    );
  }

  deleteInstitute(id: string) {
    const url = environment.server + '/institute/' + id;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  // =====================STUDENT API===================

  getCourseTD(id: string) {
    const url = `${environment.server}/institute/getCourseTD/${id}`;
    return this.http.get(url).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  //  ADD NEW STUDENT
  addStudent(student: any, instituteId: string) {
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

    return this.http.post(environment.server + '/institute/student/add', data).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  //  GET ONE STUDENT BY EDU-ATLAS ID
  getOneStudent(data: any) {
    return this.http
      .post(environment.server + '/institute/student/getOneStudent', { eduatlasId: data })
      .pipe(
        tap((res) => {}),
        map((res) => res),
        catchError(this.handleError),
      );
  }

  //  GET ONE STUDENT FOR EDITING AND VIEWING
  getOneStudentByInstitute(data: any) {
    return this.http
      .post(environment.server + '/institute/student/getOneStudentByInstitute', data)
      .pipe(
        tap((res) => {}),
        catchError(this.handleError),
      );
  }

  //  GET ACTIVE STUDENTs
  getActiveStudents(id: string, courseId: string, batchId: string) {
    const data = { instituteId: id, courseId };
    return this.http.post(environment.server + '/institute/student/getActiveStudents', data).pipe(
      tap((res) => {}),
      catchError(this.handleError),
    );
  }

  //  GET PENDING STUDENTs
  getPendingStudents(id: string, courseId: string) {
    const data = { instituteId: id, courseId };
    return this.http.post(environment.server + '/institute/student/getPendingStudents', data).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  //  ADD STUDENT COURSE
  addStudentCourse(student: any, instituteId: string, eduAtlasId: string) {
    const data = {
      eduAtlasId: eduAtlasId,

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

    return this.http.post(environment.server + '/institute/student/addCourseStudent', data).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  //  UPDATE STUDENT COURSE
  updateStudentCourse(
    student: any,
    stdId: string,
    instObjId: string,
    instituteId: string,
    eduAtlasId: string,
  ) {
    const data = {
      studentId: stdId,
      eduAtlasId: eduAtlasId,
      instituteId: instObjId,
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

    return this.http.post(environment.server + '/institute/student/updateStudentCourse', data).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  //  UPDATE STUDENT PERSONAL DETAILS
  updateStudentPersonalDetails(
    id: string,
    student: any,
    eduAtlasId: any,
    studentContact: string,
    studentEmail: string,
  ) {
    const data = {
      _id: id,
      eduAtlasId: eduAtlasId,
      basicDetails: {
        name: student.name,
        rollNumber: student.rollNo,
        studentEmail: studentEmail,
        studentContact: studentContact,
      },
      parentDetails: {
        name: student.parentName,
        parentContact: student.parentContact,
        parentEmail: student.parentEmail,
        address: student.address,
      },
    };

    return this.http
      .post(environment.server + '/institute/student/updateStudentPersonalDetails', data)
      .pipe(
        map(() => student),
        catchError(this.handleError),
      );
  }

  //  DELETE STUDENT COURSE
  deleteStudentCourse(instituteId: string, eduAtlasId: string) {
    return this.http
      .post(environment.server + '/institute/student/deleteStudentCourse', {
        _id: instituteId,
        eduatlasId: eduAtlasId,
      })
      .pipe(
        tap((res) => {}),
        catchError(this.handleError),
      );
  }

  /* ********************* ONLY FOR E-COMMERCE ****************** */

  getStudent(data: any) {
    return this.http.post(environment.server + '/institute/student/getStudent', data).pipe(
      tap((res) => {}),
      map((res: any) => res.student),
      catchError(this.handleError),
    );
  }

  deleteStudent(param: any) {
    return this.http
      .delete(environment.server + '/institute/student/', {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }

  getStudents(instituteId) {
    const url = `${environment.server}/institute/student/all/${instituteId}`;
    return this.http.get(url).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  // ========================COURSE API=====================

  getCourses(id: any) {
    return this.http.get(`${environment.server}/institute/course/all/${id}`).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }
  addCourse(id: string, course: any) {
    return this.http.post(`${environment.server}/institute/course/addCourse/${id}`, course).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  getCourse(params: any) {
    return this.http
      .get(environment.server + '/institute/course/one', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  updateCourse(params: any, course: any) {
    return this.http
      .patch(environment.server + '/institute/course/', course, {
        params: params,
      })
      .pipe(
        map(() => course),
        catchError(this.handleError),
      );
  }

  deleteCourse(param: any) {
    return this.http
      .delete(environment.server + '/institute/course/course/', {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }

  // =====================BATCHES API=================

  getBatches(branchId: string) {
    return this.http.get(`${environment.server}/institute/course/batches/${branchId}`).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  getBatch(params) {
    return this.http
      .get(environment.server + '/institute/course/batch/', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  addBatch(branchId: string, batch: any) {
    return this.http
      .post(`${environment.server}/institute/course/addBatch/${branchId}`, batch)
      .pipe(
        tap((data) => {}),
        catchError(this.handleError),
      );
  }

  deleteBatch(params: any) {
    return this.http
      .delete(environment.server + '/institute/course/batch/', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  updateBatch(params: any, batch: batchData) {
    return this.http
      .patch(environment.server + '/institute/course/batch/', batch, {
        params: params,
      })
      .pipe(
        map(() => batch),
        catchError(this.handleError),
      );
  }

  // =======================DISCOUNT API======================

  getDiscounts(id: string) {
    return this.http.get(`${environment.server}/institute/course/discounts/${id}`).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  getDiscount(params: any) {
    return this.http
      .get(environment.server + '/institute/course/discount', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  addDiscount(id: string, discount: any) {
    return this.http
      .post(`${environment.server}/institute/course/addDiscount/${id}`, discount)
      .pipe(
        tap((data) => {}),
        catchError(this.handleError),
      );
  }

  deleteDiscount(params: any) {
    return this.http
      .delete(environment.server + '/institute/course/discount/', {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  updateDiscount(params: any, discount: any) {
    return this.http
      .patch(environment.server + '/institute/course/discount/', discount, {
        params: params,
      })
      .pipe(
        map(() => discount),
        catchError(this.handleError),
      );
  }

  // ==========================RECEIPT API====================

  getReceipt(id: string) {
    return this.http.get(`${environment.server}/institute/course/reciept/${id}`).pipe(
      map((data: any) => data.reciept),
      catchError(this.handleError),
    );
  }

  addReceipt(id: string, receipt: any) {
    receipt.id = null;
    return this.http.post(`${environment.server}/institute/course/addReciept/${id}`, receipt).pipe(
      tap((data) => {}),
      catchError(this.handleError),
    );
  }

  updateReceipt(id: string, reciept: any) {
    const url = `${environment.server}/institute/course/reciept/${id}`;
    return this.http.patch(url, reciept).pipe(
      map(() => reciept),
      catchError(this.handleError),
    );
  }

  deleteReceipt(id: string) {
    return this.http
      .delete(`${environment.server}/institute/course/reciept/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
