import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const sessionToken = localStorage.getItem('jwtStrap');

const API = environment.apiUrlStrapi;
const USER = environment.strapiUser;
const PASS = environment.strapiPass;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: false
};

const httpOptionsBearer = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionToken}`
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})
export class StrapiBabylon2Service {
  constructor(private http: HttpClient) {}

  loginStrapi() {
    const data = {
      email: USER,
      password: PASS,
    }
    return this.http.post(`${API}admin/login`, data, httpOptions);
  }

  getContentTypesSettings(){
    return this.http.get(`${API}content-manager/content-types-settings`, httpOptionsBearer);
  }

  getContentTypes(){
    return this.http.get(`${API}content-manager/content-types`, httpOptionsBearer);
  }

  getTableCollectionItems(application: string, page: string | number, size: string | number, sortKey: string, sortOrder: string = "ASC") {
    return this.http.get(`${API}content-manager/collection-types/${application}?page=${page}&pageSize=${size}&_sort=${sortKey}:${sortOrder}`, httpOptionsBearer);
  }

  getTableCollectionItem(application: string, id: string | number) {
    return this.http.get(`${API}content-manager/collection-types/${application}/${id}`, httpOptionsBearer);
  }

  setTableCollectionItem(application: string, data: any) {
    return this.http.post(`${API}content-manager/collection-types/${application}`, data, httpOptionsBearer);
  }

  deleteTableCollectionItem(application: string, id: string | number) {
    return this.http.delete(`${API}content-manager/collection-types/${application}/${id}`, httpOptionsBearer);
  }

  updateTableCollectionItem(application: string, data: any, id: string | number) {
    return this.http.put(`${API}content-manager/collection-types/${application}/${id}`, data, httpOptionsBearer);
  }

  cloneTableCollectionItem(application: string, data: any) {
    return this.http.post(`${API}content-manager/collection-types/${application}`, data, httpOptionsBearer);
  }

  getSelectRelationsCollection(application: string, entity: string, data: any, limit: number = 20) {
    return this.http.post(`${API}content-manager/relations/${application}/${entity}?_limit=${limit}`, data, httpOptionsBearer);
  }


}
