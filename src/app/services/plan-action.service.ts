import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlanAction } from '../plan-action';

@Injectable({
  providedIn: 'root'
})
export class PlanActionService {
  backEndUrl: string = "https://localhost:44388/api/Normes";
  formCum = this.fb.group({
    planId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    notationid: [0, Validators.required],
    plandescription:[''],
    PlanDate:[''],
    image:['']
  });
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  postRec(cumulative: PlanAction) {
    return this.http.post(this.backEndUrl + "/PostNote", cumulative, { responseType: "text" })
  }
}
