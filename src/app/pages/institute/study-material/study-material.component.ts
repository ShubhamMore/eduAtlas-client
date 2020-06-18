import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-study-material',
  templateUrl: './study-material.component.html',
  styleUrls: ['./study-material.component.scss'],
})
export class StudyMaterialComponent implements OnInit {
  display: boolean;
  materials: any[] = [];
  instituteId: any;
  edit: any;
  materialForm: FormGroup;
  courses: any[] = [];
  batches: any[] = [];
  constructor() {}

  ngOnInit() {
    this.display = false;
  }

  editMaterial(i: any) {}
  deleteMaterial(i: any) {}

  addMaterial() {}
}
