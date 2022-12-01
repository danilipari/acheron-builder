import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleObj } from '../../app/shared/interfaces';

const API_KEY = 'AAPK1cc0491e1ae94ae8bd0c5dda88033760uyS6XGZQ6kaqdgcQbO1RZi6xMFWhFdxjIPk-RgCSE0uQ7YZo0nnVmJZtdlvMmgNo';
const URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  constructor(private http: HttpClient) {}

  translate(obj: GoogleObj, key: string) {
    return this.http.post(URL + key, obj);
  }
}
