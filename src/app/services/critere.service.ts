import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Critere } from '../critere';

@Injectable({
  providedIn: 'root'
})
export class CritereService {
  CritereList: any = []
  backEndUrl: string = "https://localhost:44388/api/criteres";
  constructor(private http: HttpClient, private fb: FormBuilder) {

  }

  postCritere(cumulative: any) {
    return this.http.post(this.backEndUrl + "/PostFilale", cumulative)
  }

  getListCriteres() {
    return this.http.get(this.backEndUrl + "/GetAllcriters")
  }
  deleteCritere(cumulative: any) {
    return this.http.delete(this.backEndUrl + "/Deletecriteres?SaisieCommentId=" + cumulative, { responseType: "text" })
  }
  editCritere(cumulative: any) {
    return this.http.put(this.backEndUrl + "/Putcriteres", cumulative, { responseType: "text" })
  }

  getCritereByNorme(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetAllcritersByNormes?id=" + cumulative)
  }

  getGroupedCriterion() {
    return this.http.get(this.backEndUrl + "/getGroupedCriterion")
  }
  getcriteres(cumulative: any) {
    return this.http.get(this.backEndUrl + "/" + cumulative,)
  }
}

