import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentDataComponent } from './appoinment-data.component';

describe('AppoinmentDataComponent', () => {
  let component: AppoinmentDataComponent;
  let fixture: ComponentFixture<AppoinmentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
