import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctordataComponent } from './doctordata.component';

describe('DoctordataComponent', () => {
  let component: DoctordataComponent;
  let fixture: ComponentFixture<DoctordataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctordataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctordataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
