import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Norme } from '../norme';
import { Pole } from '../pole';
import { PoleComponent } from '../pole/pole.component';

@Injectable({
  providedIn: 'root'
})
export class NormeServiceService {

  NormeList: any = []

  formCum = this.fb.group({
    normeId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    designation: ['', Validators.required],
  });

  backEndUrl: string = "https://localhost:44388/api/Normes";
  constructor(private http: HttpClient, private fb: FormBuilder) { }


  postNorme(cumulative: Norme) {
    return this.http.post(this.backEndUrl + "/PostNormes", cumulative, { responseType: "text" })
  }
  listNormes: Norme[] = []
  getListNormes() {
    return this.http.get(this.backEndUrl + "/GetAllNormes")
  }
  deleteNorle(cumulative: any) {
    return this.http.delete(this.backEndUrl + "/DeleteNormes?SaisieCommentId=" + cumulative, { responseType: "text" })
  }
  editNorme(cumulative: Norme) {
    return this.http.put(this.backEndUrl + "/PutNormes", cumulative, { responseType: "text" })
  }
}
