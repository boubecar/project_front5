import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Filiale } from '../filiale';

@Injectable({
  providedIn: 'root'
})
export class FilialeService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  formCum = this.fb.group({
    filialeId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    filialeName: ['', Validators.required],
    pole: [''],
  });
  listFiliale: Filiale[] = []
  backEndUrl: string = "https://localhost:44388/api/Filiale";

  postFiliale(cumulative: any) {
    return this.http.post(this.backEndUrl + "/PostFilale", cumulative, { responseType: "text" })
  }
  getFilialeList(): Observable<any[]> {
    return this.http.get<any>(this.backEndUrl + '/GetAllFiliale');
  }

  updateFiliale(val: any) {
    return this.http.put(this.backEndUrl + '/PutPole', val);
  }
  deleteFiliale(val: any) {
    return this.http.delete(this.backEndUrl + '/DeleteFiliale?SaisieCommentId=' + val, { responseType: "text" });
  }
  UploadPhoto(val: any) {
    return this.http.post(this.backEndUrl + '/SaveFile', val);
  }
}
