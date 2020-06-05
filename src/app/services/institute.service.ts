import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstituteService {
  institutes: any[] = [];

  constructor() {}

  setInstitutes(institutes: any[]) {
    this.institutes = institutes;
  }

  getInstitutes() {
    return this.institutes;
  }
}
