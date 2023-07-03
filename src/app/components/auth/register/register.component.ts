import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isPasswordMatch = true;

  registerform = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cpassword: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
    image: new FormControl('no image')
  })

  constructor(private app: AppService, private router: Router) { }

  registerUser() {
    this.registerform.controls['name'].markAsTouched()
    this.registerform.controls['email'].markAsTouched()
    this.registerform.controls['password'].markAsTouched()
    this.registerform.controls['cpassword'].markAsTouched()
    this.registerform.controls['contactNumber'].markAsTouched()
    this.registerform.controls['image']


    if (this.registerform.value.password != this.registerform.value.cpassword) return this.isPasswordMatch = false;
    else this.isPasswordMatch = true;
    if (this.registerform.invalid) return false;

    return this.app.register(this.registerform.value).subscribe((res: any) => {
      console.log(res);
      if (res.status == 1) {
        localStorage.setItem('user', JSON.stringify(res.data))
        if (res.data.userType == 'Doctor') this.router.navigate(['/doctor/home'])
        else if (res.data.userType == 'Patient') this.router.navigate(['/patient/home'])
        else this.router.navigate(['/admin'])
      }
    })

  }

  get name() {
    return this.registerform.get('name')
  }

  get email() {
    return this.registerform.get('email')
  }

  get password() {
    return this.registerform.get('password')
  }

  get cpassword() {
    return this.registerform.get('cpassword')
  }

  get contactNumber() {
    return this.registerform.get('contactNumber')
  }

  get userType() {
    return this.registerform.get('userType')
  }
  get image() {
    return this.registerform.get('image')
  }

}
