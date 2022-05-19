import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlanAction } from '../plan-action';

@Injectable({
  providedIn: 'root'
})
export class PlanActionService {
  backEndUrl: string = "https://localhost:44388/api/plan_action";
  formCum = this.fb.group({
    planid: ['00000000-0000-0000-0000-000000000000', Validators.required],
    notationid: ['00000000-0000-0000-0000-000000000000'],
    plandescription: [''],
    image: [''],
    planDate: ['']
  });
  toasts: any;
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  postRec(cumulative: any) {
    return this.http.post(this.backEndUrl + "/Postplan_action", cumulative, { responseType: "text" })
  }



  GetAllplan_action() {
    return this.http.get(this.backEndUrl + "/GetAllplan_action")
  }
  GetAllplanByNote(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetAllplan_actionNote?id=" + cumulative,)
  }
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
}
