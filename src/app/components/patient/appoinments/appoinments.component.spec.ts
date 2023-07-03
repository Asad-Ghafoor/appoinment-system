import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentsComponent } from './appoinments.component';

describe('AppoinmentsComponent', () => {
  let component: AppoinmentsComponent;
  let fixture: ComponentFixture<AppoinmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
