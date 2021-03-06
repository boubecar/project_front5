import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Norme } from '../norme';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PoleServiceService {
  // readonly APIUrl="http://localhost:53535/api/Pole";
  PoleList: any = []

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  formCum = this.fb.group({
    poleId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    poleName: ['', Validators.required],
    image: ['']
  });
  backEndUrl: string = "https://localhost:44388/api/Pole";

  postPole(cumulative: any, cumulative2: any) {
    return this.http.post(this.backEndUrl + "/PostPole", cumulative + cumulative2, { responseType: "text" },)
  }
  getPoleList(): Observable<any[]> {
    return this.http.get<any>(this.backEndUrl + '/GetAllPole');
  }
  updatePole(val: any) {
    return this.http.put(this.backEndUrl + '/PutPole', val, { responseType: "text" });
  }
  deletePole(val: any) {
    return this.http.delete(this.backEndUrl + '/DeletePole?SaisieCommentId=' + val, { responseType: "text" });
  }
  UploadPhoto(val: any) {
    return this.http.post(this.backEndUrl + '/SaveFile', val);
  }

}
