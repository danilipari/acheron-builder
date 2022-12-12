import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleObj } from '../../app/shared/interfaces';
import { environment } from 'src/environments/environment';

const API = environment.apiUrlGoogle;
const API_KEY = environment.apiKeyGoogle;

const API_URL = `${API}?key=${API_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  constructor(private http: HttpClient) {}

  translate(obj: GoogleObj) {
    return this.http.post(API_URL, obj);
  }
}
