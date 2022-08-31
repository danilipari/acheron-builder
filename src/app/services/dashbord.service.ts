import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})
export class DashbordService {
  constructor(private http: HttpClient) {}

  getInfo() {
    return this.http.get(`${API}info`, httpOptions);
  }

}
