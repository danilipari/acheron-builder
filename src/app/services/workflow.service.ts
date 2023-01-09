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
export class WorkflowService {
  constructor(private http: HttpClient) {}

  getWorkflows(type?: string) {
    if (type === 'render') {
      return this.http.get(`${API}workflow/render`, httpOptions);
    } else {
      return this.http.get(`${API}workflow`, httpOptions);
    }
  }

  getWorkflow(id: number | string) {
    return this.http.get(`${API}workflow/${id}`, httpOptions);
  }

  saveWorkflow(data: any, workflow_id?: number | string) {
    if (workflow_id) {
      return this.http.post(`${API}workflow/${workflow_id}`, data, httpOptions);
    } else {
      return this.http.post(`${API}workflow`, data, httpOptions);
    }
  }

  deleteWorkflow(id: number | string) {
    return this.http.delete(`${API}workflow/${id}`, httpOptions);
  }
}
