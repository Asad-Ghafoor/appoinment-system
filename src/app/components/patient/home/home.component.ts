import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  doctorsData: any = [];

  constructor(private app: AppService) { }

  getDoctors() {
    let temp = this.app.usersDataGet()
    console.log(temp);
    this.app.getDoctors().subscribe((res: any) => {
      console.log(res.data)
      this.doctorsData = res.data
      console.log(this.doctorsData)
    })
  }

  ngOnInit(): void {
    this.getDoctors();
  }

}
