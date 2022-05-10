import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  backEndUrl: string = "https://localhost:44388/api/notation";
  formCum = this.fb.group({
    Id: ['00000000-0000-0000-0000-000000000000', Validators.required],
    note: ['', Validators.required],
    comment: ['', Validators.required],
    criterelabel: ['', Validators.required],
  });
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  postNote(cumulative: Note) {
    return this.http.post(this.backEndUrl + "/Postnotation", cumulative, { responseType: "text" })
  }
  GetAlltNote() {
    return this.http.get(this.backEndUrl + "/GetAllnotation")
  }
  GetAllplanByNote(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetAllplan_actionNote?id=" + cumulative,)
  }
}
