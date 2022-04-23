import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  backEndUrl: string = "https://localhost:44388/api/Normes";
  formCum = this.fb.group({
    Id: ['00000000-0000-0000-0000-000000000000', Validators.required],
    note: [0, Validators.required],
    image:[''],
    criterelabel:[''],
    Commentaire:[''],
  });
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  postNote(cumulative: Note) {
    return this.http.post(this.backEndUrl + "/PostNote", cumulative, { responseType: "text" })
  }

}
