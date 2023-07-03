import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-appoinment-data',
  templateUrl: './appoinment-data.component.html',
  styleUrls: ['./appoinment-data.component.scss']
})
export class AppoinmentDataComponent implements OnInit {
  //in this patient all thae data come from the appoinmets which is using fro the loop
  data: any = [];

  //in this allpatient all thae data come from the getpatients which is using fro the loop
  allpatient: any = [];

  //in this doctors all thae data come from the getAllDoctors which is using fro the loop
  doctors: any = [];

  pageSize = 10;
  currentPage = 1;

  constructor(private app: AppService) { }

  //  make the function in which all doctors data are getting from database which is present in the API 'GetDoctors' all 
  // doctors data are goes to response 
  getAllDoctors() {
    this.app.getDoctors().subscribe(res => {
      // doctors data store in a veribale doctors
      this.doctors = res['data']
      // console.log(res)

    });
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  //  make the function in which all patients data are getting from database which is present in the API 'getPatients' all 
  // patients data are goes to response 
  getpatients() {
    this.app.getPatients().subscribe(res => {
      // patients data store in a veribale allpatient
      this.allpatient = res['data']
      // console.log(res['data'])

    });
  }

  // appoinments ka function call kia hy 

  appoinmentsdata() {
    this.app.appoinments().subscribe(res => {
      this.data = res['data']
      console.log(res)

    });
  }

  ngOnInit(): void {
    //call the function appoinments 
    this.appoinmentsdata();
    //call the function getAllDoctors 
    this.getAllDoctors();
    //call the function getpatients 
    this.getpatients();
  }

  // this is using for the validating the form field at frontend
  registerform = new FormGroup({
    //valaditing the doctor input field
    doctor: new FormControl('', Validators.required),
    //valaditing the patient input field
    patient: new FormControl('', Validators.required),
    //valaditing the timing input field
    timing: new FormControl('', Validators.required),
  })



  // reguister ka btn pr click kia hy  appoinments ki jo api lagai hy as mn register ka from ki value gai hy aur response aya hy
  registerUser() {
    // hit the createAppoinmrnts function which is present in appSerrvices in which form value goes and return it response 
    this.app.createAppoinments(this.registerform.value).subscribe((res: any) => {
      //as response lo prin krwa dia hy 
      console.log(res);
      // appoinments ka function call krwa dia hy ta kh function call ho aur data jo print ho raha hyy update ho jay
      if (res.status == 1) {
        this.appoinmentsdata();
      }
    })

  }

  //doctor ki value get kr rahy hyn register ka form mn sa 
  get doctor() {
    return this.registerform.get('doctor')
  }

  //patient ki value get kr rahy hyn register ka form mn sa 
  get patient() {
    return this.registerform.get('patient')
  }

  //timing  ki value get kr rahy hyn register ka form mn sa 
  get timing() {
    return this.registerform.get('timing')
  }

}
