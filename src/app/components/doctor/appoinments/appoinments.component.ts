import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss']
})
export class AppoinmentsComponent {
  appoinmentData: any = []

  constructor(private app: AppService) { }

  getDoctorsAppoinments() {
    let user = this.app.usersDataGet()
    this.app.getAppoinments(user._id).subscribe((res: any) => {
      console.log(res.data)
      this.appoinmentData = res.data
      console.log(this.appoinmentData)
    })
  }

  ngOnInit(): void {
    this.getDoctorsAppoinments();
  }

}
