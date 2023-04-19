import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincourseComponent } from './main-course.component';

describe('MaincourseComponent', () => {
  let component: MaincourseComponent;
  let fixture: ComponentFixture<MaincourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaincourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaincourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
