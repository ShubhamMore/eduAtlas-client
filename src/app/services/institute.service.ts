import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstituteService {
  institutes: any[] = [];

  institute: any;

  constructor() {}

  setInstitute(institute: any) {
    this.institute = institute;
  }

  getInstitute() {
    return this.institute;
  }

  setInstitutes(institutes: any[]) {
    this.institutes = institutes;
  }

  getInstitutes() {
    return this.institutes;
  }
}
