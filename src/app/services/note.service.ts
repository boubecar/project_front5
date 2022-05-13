import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  backEndUrl: string = "https://localhost:44388/api/notation";
<<<<<<< Updated upstream
  // formCum = this.fb.group({
  //   id: ['00000000-0000-0000-0000-000000000000', Validators.required],
  //   note: ['', Validators.required],
  //   comment: ['', Validators.required],
  //   criterelabel: ['', Validators.required],
  // });
=======
  formCum = this.fb.group({
    Id: ['00000000-0000-0000-0000-000000000000', Validators.required],
    note: [0, Validators.required],
    image: [''],
    critereid: [''],
    comment: [''],
    evaluer: [''],
    Userid: [''],
    FilLocal: [''],
    date_notation: ['']
  });
>>>>>>> Stashed changes
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  postNote(cumulative: any) {
    return this.http.post(this.backEndUrl + "/Postnotation", cumulative, { responseType: "text" })
  }
  GetAlltNote() {
    return this.http.get(this.backEndUrl + "/GetAllnotation")
<<<<<<< Updated upstream
  }
  GetAllplanByNote(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetAllplan_actionNote?id=" + cumulative,)
  }
  GetAllNoteByLocal(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetSumnotationByFilLocal?id=" + cumulative,)
=======
>>>>>>> Stashed changes
  }

}
