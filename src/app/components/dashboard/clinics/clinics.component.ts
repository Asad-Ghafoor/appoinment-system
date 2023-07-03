import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit {
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  ClinicsData: any = [];
  pastName: any;
  pastAddress: any;
  paststatus: any;
  timeSlot: any[] = [];
  selectedId: string = "";
  selectTime = 0;
  timeSelect: any[] = [];
  upDateData: any;
  useUpdateId: string = "";
  upDateClinicFormvalue: any;
  hospitalName!: String;
  days!: String;
  setId!: String;
  showClearButton: boolean = false;
  getIndex: any;
  matchFound = false;
  show = false;

  clinicForm = this.fb.group({
    timing: this.fb.group({
      startTime: ['', Validators.required],
      endTime: new FormControl('', Validators.required),
    }),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  })

  timeSlotForm = this.fb.group({
    timing: this.fb.group({
      startTime: ['', Validators.required],
      endTime: new FormControl('', Validators.required),
    })
  })

  upDateClinicForm = this.fb.group({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  })

  constructor(private app: AppService, private fb: FormBuilder) {
    this.timing();
  }

  timing() {
    for (let i = 0; i < 24; i++) {
      this.timeSlot.push(i)
    }
  }

  timechange(value: any) {
    this.selectTime = value.value;
    const existingItem = this.timeSelect.find(item =>
      item.startTime == this.selectTime
    );

    if (!existingItem) {
      console.log('no match');
      this.matchFound = false;
      this.show = false;
    }
    else {
      this.matchFound = true;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
      this.timeSlotForm.reset();
    }
  }

  endtimechange(value: any) {
    const existingItem = this.timeSelect.find(item =>
      item.endTime == value.value
    );

    if (!existingItem) {
      console.log('no match');
      this.matchFound = false;
      this.show = false;
    }
    else {
      this.matchFound = true;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
      this.timeSlotForm.reset();
    }
  }


  ngOnInit(): void {
    this.getAllClinics();
  }

  getAllClinics() {
    this.app.clinics().subscribe(res => {
      this.ClinicsData = res['data'];
    });
  }

  delete(_id: string) {
    this.app.deleteClinics(_id).subscribe(res => {
      if (res['status'] == 1) {
        this.getAllClinics();
      }
      else {
        console.log("nothing found");
      }
    })
  }

  GetTiming(item: any) {
    this.selectedId = item._id;
    this.timeSelect = item.timing
  }

  deleteTime(item: any) {
    this.timeSelect.splice(item, 1)
  }

  updateTiming(_id: any) {
    this.upDateData = { timing: this.timeSelect, _id }
    this.app.updateTiming(this.upDateData).subscribe((res: any) => {
      console.log(res);


    });
  }

  clinicFormSubmit() {
    return this.app.clicnicFormData(this.clinicForm.value).subscribe((res: any) => {
      this.getAllClinics();
      this.clinicForm.reset()
    })
  }

  TimeSlotFormSubmit() {

    const startTmie = this.timeSlotForm.value.timing?.startTime;
    const endTime = this.timeSlotForm.value.timing?.endTime;

    const isOverlap = this.timeSelect.some(item =>
      (startTmie! >= item.startTime && startTmie! < item.endTime) ||
      (endTime! > item.startTime && endTime! <= item.endTime) ||
      (startTmie! <= item.startTime && endTime! >= item.endTime)
    );

    if (isOverlap) {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
      this.timeSlotForm.reset();
      return;
    }
    else {

      if (this.getIndex || this.getIndex == 0) {

        this.timeSelect[this.getIndex] = this.timeSlotForm.value.timing
      } else {
        this.timeSelect.push(this.timeSlotForm.value.timing);
      }
    }

  }

  getIdForList(item) {
    this.hospitalName = item.name;
    this.timeSelect = item.timing;
    this.setId = item._id;
  }

  getId(_id: string, name: any, address: any, status: any) {
    this.useUpdateId = _id;
    this.paststatus = status;
    this.pastAddress = address;
    this.pastName = name;
  }
  upDateClinic(_id: string) {
    this.upDateClinicFormvalue = { ...this.upDateClinicForm.value, _id }
    this.app.updateTiming(this.upDateClinicFormvalue).subscribe((res: any) => {
      this.getAllClinics();
      this.upDateClinicForm.reset();
    })
  }

  getDayName(day: String) {
    this.days = day;
  }

  populateTimie(i, item) {
    this.showClearButton = true;
    this.timeSlotForm.patchValue({
      timing: {
        startTime: item.startTime,
        endTime: item.endTime
      }
    });
    this.getIndex = i;
  }

  onClearClick() {
    this.showClearButton = false;
    this.timeSlotForm.reset();
  }


  get address() {
    return this.clinicForm.get('address')
  }

  get name() {
    return this.clinicForm.get('name')
  }

  get startTime() {
    return this.clinicForm.get('timing.startTime')
  }

  get endTime() {
    return this.clinicForm.get('timing.endTime')
  }

  get status() {
    return this.clinicForm.get('status')
  }
}
