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

  getCategoriesItems(page: string | number, size: string | number) {
    return this.http.get(`${API}content-manager/collection-types/application::category.category?page=${page}&pageSize=${size}&_sort=category_title:ASC`, httpOptionsBearer);
  }

  getCountriesItems(page: string | number, size: string | number) {
    return this.http.get(`${API}content-manager/collection-types/application::country.country?page=${page}&pageSize=${size}&_sort=Country:ASC`, httpOptionsBearer);
  }

  getTableCollectionItems(section: string, page: string | number, size: string | number, sortKey: string, sortOrder: string = "ASC") {
    return this.http.get(`${API}content-manager/collection-types/application::${section}.${section}?page=${page}&pageSize=${size}&_sort=${sortKey}:${sortOrder}`, httpOptionsBearer);
  }

}
