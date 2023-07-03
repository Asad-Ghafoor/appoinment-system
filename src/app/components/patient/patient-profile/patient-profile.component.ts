import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  user = {};

  constructor(private app: AppService) { }

  getUser() {
    this.user = this.app.usersDataGet();
    console.log(this.user)
  }

  ngOnInit(): void {
    this.getUser();
  }

}
