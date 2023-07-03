import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-patientdata',
  templateUrl: './patientdata.component.html',
  styleUrls: ['./patientdata.component.scss']
})
export class PatientdataComponent implements OnInit {
  url: any = environment.imageLink;
  patients: any = [];
  Id: any;
  upDateData: any;
  imageSrc: string = "/assets/avatar.png";
  file: any;

  constructor(private app: AppService, private fb: FormBuilder) { }

  getpatients() {
    this.app.getPatients().subscribe(res => {
      console.log(res);

      this.patients = res['data']
    });
  }


  ngOnInit(): void {
    this.getpatients();
  }

  delete(_id: string) {
    this.app.deletePatient(_id).subscribe(res => {
      if (res['status'] == 1) {
        this.getpatients();
      }
      else {
        console.log("nothing found");
      }


    })
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


  isPasswordMatch = true;

  registerform = this.fb.group({
    'name': (['', Validators.required]),
    'email': (['', [Validators.required, Validators.email]]),
    'password': (['', Validators.required]),
    'cpassword': (['', Validators.required]),
    'contactNumber': (['', Validators.required]),
    'userType': (['', Validators.required]),
    'image': ([''])
  })

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
        this.registerform.get("image")?.setValue(file['name'])
        this.app.register(this.registerform.value).subscribe((res: any) => {
          if (res.status == 1) {
            localStorage.setItem('user', JSON.stringify(res.data))
          }
        });
      }
    });
  }

  updateForm = this.fb.group({
    'name': (['', Validators.required]),
    'email': (['', [Validators.required, Validators.email]]),
    'contactNumber': (['', Validators.required]),
    'userType': (['', Validators.required]),
    'image': (['', Validators.required]),
    'profile': ['']
  });

  update(data: any) {
    this.Id = data._id;
    this.updateForm.get("name")?.setValue(data.name);
    this.updateForm.get("email")?.setValue(data.email);
    this.updateForm.get("contactNumber")?.setValue(data.contactNumber);
    this.updateForm.get("userType")?.setValue(data.userType);
    this.updateForm.get("image")?.setValue(data.image);
  }

  updateFormSubmit(_id: any) {
    this.registerform.controls['name'].markAsTouched()
    this.registerform.controls['email'].markAsTouched()
    this.registerform.controls['contactNumber'].markAsTouched()

    this.upDateData = { ...this.updateForm.value, _id }
    this.app.updateUser(this.upDateData).subscribe((res: any) => {
      this.updateForm.reset();
      this.getpatients();
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
    return this.registerform.get('Patient')
  }

  get image() {
    return this.registerform.get('image')
  }

}
