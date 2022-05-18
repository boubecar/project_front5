import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Filiale } from '../filiale';

@Injectable({
  providedIn: 'root'
})
export class FilialeService {

  formCum = this.fb.group({
    filialId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    filialName: ['', Validators.required],
    poleId: ['00000000-0000-0000-0000-000000000000', Validators.required],
  });

  filList: any = []
   detailPole:any=[]
  listFiliale: Filiale[] = []
  backEndUrl: string = "https://localhost:44388/api/Filiale";
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  

  postFiliale(cumulative: any) {
    return this.http.post(this.backEndUrl + "/PostFilale", cumulative, { responseType: "text" })
  } 
  getFilialeList(): Observable<any[]> {
    return this.http.get<any>(this.backEndUrl + '/GetAllFiliale');
  }

  updateFiliale(val: any) {
    return this.http.put(this.backEndUrl + '/PutFiliale', val);
  }
  deleteFiliale(val: any) {
    return this.http.delete(this.backEndUrl + '/DeleteFiliale?SaisieCommentId=' + val, { responseType: "text" });
  }
  UploadPhoto(val: any) {
    return this.http.post(this.backEndUrl + '/SaveFile', val);
  }
  GetAllfilialeByPole(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetAllfilialeByPole?id=" + cumulative,)
  }
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast:any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }


}
