import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadClassRecordingComponent } from './upload-class-recording.component';

describe('UploadClassRecordingComponent', () => {
  let component: UploadClassRecordingComponent;
  let fixture: ComponentFixture<UploadClassRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadClassRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadClassRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
