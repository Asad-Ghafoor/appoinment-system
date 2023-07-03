import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  register(data: {}) {
    return this.http.post(this.url + 'user/register', data)
  }

  login(data: {}) {
    console.log(data)
    return this.http.post(this.url + 'user/login', data)
  }

  createAppoinments(data: {}) {
    // in this funtion form valus goes to data which is in object and it send the value of the data into the url
    // and return the data 
    return this.http.post(this.url + 'appoinment/create', data)
    // the backend response come in post method which is return to function createAppoinments
  }

  getAppoinments(_id: string) {
    return this.http.get(this.url + 'appoinment/get/' + _id)
  }

  usersDataSet(data: {}) {
    return localStorage.setItem('user', JSON.stringify(data));
  }

  getalldoctors(data: {}) {
    return this.http.get(this.url + 'user/getAllDoctors', data)

  }

  getDoctors() {
    return this.http.get(this.url + 'user/getDoctors')
  }

  getPatients() {
    return this.http.get(this.url + 'user/getAllPatient')
  }

  deletePatient(_id: string) {
    return this.http.delete(this.url + 'user/delete/' + _id)
  }

  appoinments() {
    return this.http.get(this.url + 'appoinment/appoinments')
  }

  clicnicFormData(data: {}) {
    console.log(data)
    return this.http.post(this.url + 'clinic/AddClinic', data)
    console.log(data)

  }

  clinics() {
    return this.http.get(this.url + 'clinic/allhospitals')
  }

  deleteClinics(_id: string) {
    return this.http.delete(this.url + 'clinic/deleteClinics/' + _id)
  }

  updateTiming(_id: string) {
    return this.http.put(this.url + 'clinic/update/', _id)
  }

  updateUser(_id: string) {
    return this.http.put(this.url + 'user/update', _id)
  }

  uploadImages(imageSrc: FormData) {
    return this.http.post(this.url + 'uploads/multer', imageSrc)
  }
  usersDataGet() {
    let user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return {};
  }
}
