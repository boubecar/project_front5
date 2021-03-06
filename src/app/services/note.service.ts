import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  backEndUrl: string = "https://localhost:44388/api/notation";
  // formCum = this.fb.group({
  //   id: ['00000000-0000-0000-0000-000000000000', Validators.required],
  //   note: ['', Validators.required],
  //   comment: ['', Validators.required],
  //   criterelabel: ['', Validators.required],
  // });
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  postNote(cumulative: any) {
    return this.http.post(this.backEndUrl + "/Postnotation", cumulative, { responseType: "text" })
  }
  GetAlltNote(cumulative: any, cumulative2: any, date: any) {
    return this.http.get(this.backEndUrl + "/GetAllnotation?filialeId=" + cumulative + "&id=" + cumulative2 +
      '&date=' + date)
  }
  GetAllplanByNote(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetAllplan_actionNote?id=" + cumulative,)
  }
  GetAllNoteByLocal(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetSumnotationByFilLocal?id=" + cumulative,)
  }
  GetAllNoteByLocal2(cumulative: any, cumulative2: any, cumulative3: any) {
    return this.http.get(this.backEndUrl + "/GetSumnotationByFilLocal?filialeId=" + cumulative + "&id=" + cumulative2 + "&date=" + cumulative3,)
  }
  getnotation(cumulative: any) {
    return this.http.get(this.backEndUrl + "/" + cumulative,)
  }
  GetSum(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetSum?id=" + cumulative,)
  }
  GetSum2(cumulative: any, cumulative2: any, cumulative3: any) {
    return this.http.get(this.backEndUrl + "/GetSum?filialeId=" + cumulative + "&id=" + cumulative2 + "&date=" + cumulative3,)
  }
  updateNote(val: any) {
    return this.http.put(this.backEndUrl + '/Putnotation', val, { responseType: "text" });
  }
}
