import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  backEndUrl: string = "https://localhost:44388/api/Users";
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  PostUser(cumulative: any) {
    return this.http.post(this.backEndUrl + "/PostUser", cumulative, { responseType: "text" })
  }

  getUserList(): Observable<any[]> {
    return this.http.get<any>(this.backEndUrl + '/GetAllFiliale');
  }

  updateUser(val: any) {
    return this.http.put(this.backEndUrl + '/PutUser', val);
  }
  deleteUser (val: any) {
    return this.http.delete(this.backEndUrl + '/DeleteUsers?SaisieCommentId=' + val, { responseType: "text" });
  }

}
