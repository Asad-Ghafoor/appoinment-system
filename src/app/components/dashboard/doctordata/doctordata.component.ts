import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-doctordata',
  templateUrl: './doctordata.component.html',
  styleUrls: ['./doctordata.component.scss']
})
export class DoctordataComponent implements OnInit {
  url: any = environment.imageLink;
  imageSrc: string = "/assets/avatar.png";
  file: any;
  doctors: any = [];
  router: any;
  Id: any;
  upDateData: any;
  isPasswordMatch = true;

  constructor(private app: AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  registerform = this.fb.group({
    'name': (['', Validators.required]),
    'email': (['', [Validators.required, Validators.email]]),
    'password': (['', Validators.required]),
    'cpassword': (['', Validators.required]),
    'contactNumber': (['', Validators.required]),
    'userType': (['', Validators.required]),
    'image': ([''])
  })



  updateForm = this.fb.group({
    'name': (['', Validators.required]),
    'email': (['', [Validators.required, Validators.email]]),
    'contactNumber': (['', Validators.required]),
    'userType': (['', Validators.required])
  });


  updateFormSubmit(_id: any) {
    this.registerform.controls['name'].markAsTouched()
    this.registerform.controls['email'].markAsTouched()
    this.registerform.controls['contactNumber'].markAsTouched()

    this.upDateData = { ...this.updateForm.value, _id };
    if (this.file) {
      this.upload().subscribe(file => {
        if (file['status'] == 1) {
          this.upDateData.image = file['name'];
          this.updateDoctor(this.upDateData);
        }
      });
    } else {
      this.updateDoctor(this.upDateData);
    }
    this.app.updateUser(this.upDateData).subscribe((res: any) => {
      this.updateForm.reset();
      this.getAllDoctors();


    })
  }
  updateDoctor(data: any) {
    this.app.updateUser(data).subscribe((res: any) => {
      this.updateForm.reset();
      this.getAllDoctors();
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  upload() {
    const formData = new FormData();
    formData.append('file-upload', this.file);
    return this.app.uploadImages(formData);
  }

  update(data: any) {
    this.Id = data._id;
    this.imageSrc = this.url + data.image
    this.updateForm.get("name")?.setValue(data.name);
    this.updateForm.get("email")?.setValue(data.email);
    this.updateForm.get("contactNumber")?.setValue(data.contactNumber);
    this.updateForm.get("userType")?.setValue(data.userType);
  }

  getAllDoctors() {
    this.app.getDoctors().subscribe(res => {
      this.doctors = res['data']

    });
  }

  delete(_id: string) {
    this.app.deletePatient(_id).subscribe(res => {
      if (res['status'] == 1) {
        console.log("deleted");
        this.getAllDoctors()

      }
      else {
        console.log("not Found");

      }
    })
  }


  registerUser() {
    this.registerform.controls['name'].markAsTouched()
    this.registerform.controls['email'].markAsTouched()
    this.registerform.controls['password'].markAsTouched()
    this.registerform.controls['cpassword'].markAsTouched()
    this.registerform.controls['contactNumber'].markAsTouched()

    if (this.registerform.value.password != this.registerform.value.cpassword) return this.isPasswordMatch = false;
    else this.isPasswordMatch = true;
    if (this.registerform.invalid) return false;

    return this.upload().subscribe(file => {
      if (file["status"] == 1) {
        // console.log(this.image?.setValue(file['name']));
        this.registerform.get("image")?.setValue(file['name'])
        this.app.register(this.registerform.value).subscribe((res: any) => {
          this.registerform.reset();
          this.getAllDoctors();
          if (res.status == 1) {
            localStorage.setItem('user', JSON.stringify(res.data))
          }
        });
      }
    });
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
    return this.registerform.get('Doctor')
  }

  get image() {
    return this.registerform.get('image')
  }

}
