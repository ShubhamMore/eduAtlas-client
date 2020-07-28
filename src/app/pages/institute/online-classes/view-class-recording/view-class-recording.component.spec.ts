import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassRecordingComponent } from './view-class-recording.component';

describe('ViewClassRecordingComponent', () => {
  let component: ViewClassRecordingComponent;
  let fixture: ComponentFixture<ViewClassRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClassRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
