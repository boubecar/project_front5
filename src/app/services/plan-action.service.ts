import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlanAction } from '../plan-action';

@Injectable({
  providedIn: 'root'
})
export class PlanActionService {
  backEndUrl: string = "https://localhost:44388/api/plan_action";
  formCum = this.fb.group({
    planId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    notationid: [''],
    Plandescription: [''],
    image: [''],
    planDate: ['']
  });
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  postRec(cumulative: any) {
    return this.http.post(this.backEndUrl + "/Postplan_action", cumulative, { responseType: "text" })
  }
}
