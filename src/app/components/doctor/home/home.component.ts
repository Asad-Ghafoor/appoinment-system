import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  appoinmentData: any[] = [];
  constructor(private app: AppService, private router: Router) { }

  getDoctorsAppoinments() {
    let user = this.app.usersDataGet()
    this.app.getAppoinments(user._id).subscribe((res: any) => {
      console.log(res.data)
      this.appoinmentData = res.data.slice(0, 3);
      console.log(this.appoinmentData)
    })
  }

  viewAll() {
    console.log("hrjjj");
    this.router.navigate(['/doctor/appoinments'])
  }

  ngOnInit(): void {
    this.getDoctorsAppoinments();
  }
}
