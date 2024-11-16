import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) {}

  callAPI(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body);
  }
}
