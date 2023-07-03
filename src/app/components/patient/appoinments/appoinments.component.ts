import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss']
})
export class AppoinmentsComponent implements OnInit {

  appoinmetsData: any = [];

  constructor(private app: AppService) { }

  appoinments() {
    let appoinment = this.app.usersDataGet();

    this.app.getAppoinments(appoinment._id).subscribe(res => {
      console.log(res);
      this.appoinmetsData = res['data']
      console.log(this.appoinmetsData);
    })
  }

  ngOnInit(): void {
    this.appoinments();
  }

}
