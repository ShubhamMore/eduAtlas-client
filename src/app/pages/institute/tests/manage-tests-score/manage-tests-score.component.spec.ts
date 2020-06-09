import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestsScoreComponent } from './manage-tests-score.component';

describe('ManageTestsScoreComponent', () => {
  let component: ManageTestsScoreComponent;
  let fixture: ComponentFixture<ManageTestsScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTestsScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTestsScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
