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
export class LayoutService {
  constructor(private http: HttpClient) {}

  /* getWorkflows(type: string) {
    if (type === 'render') {
      return this.http.get(`${API}/workflows/render`, httpOptions);
    } else {
      return this.http.get(`${API}/workflows`, httpOptions);
    }
  } */

}
