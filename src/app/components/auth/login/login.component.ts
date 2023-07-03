import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(private app: AppService, private router: Router) { }

  loginUser() {

    this.loginform.controls['email'].markAsTouched()
    this.loginform.controls['password'].markAsTouched()

    return this.app.login(this.loginform.value).subscribe((res: any) => {
      if (res.status == 1) {
        if (res.data.userType == 'Doctor') {
          this.app.usersDataSet(res.data)
          this.myNavigate('doctor/home')
        }

        else if (res.data.userType == 'Patient') {
          // this.app.usersData(res.data)
          this.myNavigate('patient/home')
        }

        else {
          // this.app.usersData(res.data)
          this.myNavigate('dashboard')
        }
      }
    })


  }

  myNavigate(route: string) {
    this.router.navigate(['/' + route])
  }

  get email() {
    return this.loginform.get('email')
  }

  get password() {
    return this.loginform.get('password')
  }

}
