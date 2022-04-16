import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) { }
  
  backEndUrl: string = "https://localhost:44388/api/Pole";
  getLocalList(): Observable<any[]> {
    
    return this.http.get<any>(this.backEndUrl + '/GetAllPole');
  }
}
