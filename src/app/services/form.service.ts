import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: false,
};

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  getForms() {
    return this.http.get(`${API}form`, httpOptions);
  }

  getForm(id: string) {
    return this.http.get(`${API}form/${id}`, httpOptions);
  }

  saveForm(data: any, form_id?: number | string) {
    if (form_id) {
      return this.http.post(`${API}form/${form_id}`, data, httpOptions);
    } else {
      return this.http.post(`${API}form`, data, httpOptions);
    }
  }

  saveFormField(
    form_id: number | string,
    form_detail_id: number | string,
    data: any
  ) {
    return this.http.post(
      `${API}form/${form_id}/${form_detail_id}`,
      data,
      httpOptions
    );
  }

  deleteForm(id: number | string) {
    return this.http.delete(`${API}form/${id}`, httpOptions);
  }
}
