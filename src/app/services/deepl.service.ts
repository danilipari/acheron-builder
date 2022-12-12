import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.apiUrlDeepL;
const API_KEY = environment.apiKeyDeepL;

const httpOptionsBearer = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'User-Agent': 'acheron',
    'Content-Length': '',
    'Authorization': `DeepL-Auth-Key ${API_KEY}:fx`
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})
export class DeeplService {

  constructor(private http: HttpClient) {}


  translateDeepL(text: string, source_lang: string = "IT", target_lang: string = ""){
    return this.http.post(`${API}?text=${text}&source_lang=${source_lang}&target_lang=${target_lang}`, httpOptionsBearer);
  }
}
