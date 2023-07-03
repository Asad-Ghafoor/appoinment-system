import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

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
