import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoteComponent } from '../note/note.component';
import { PlanAction } from '../plan-action';

@Injectable({
  providedIn: 'root'
})
export class PlanActionService {
  show(NoteComponent: NoteComponent, config: { intialState: { id: any; }; class: string; }): any {
    throw new Error('Method not implemented.');
  }
  backEndUrl: string = "https://localhost:44388/api/plan_action";
  formCum = this.fb.group({
    planId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    notationid: ['00000000-0000-0000-0000-000000000000'],
    plandescription: [''],
    image: [''],
    planDate: [''],
    userid: ''
  });
  formCum2 = this.fb.group({
    id: ['00000000-0000-0000-0000-000000000000', Validators.required],
    note: 0,
    comment: [''],
    critereid: [''],
    filLocalid: [''],
    date_notation: [''],
    userid: ['3FA85F64-5717-4562-B3FC-2C963F66AFA7'],
    image: ['']
  });
  // id: '00000000-0000-0000-0000-000000000000',
  // note: 0,
  // comment: [''],
  // date_notation: ['', Validators.required],
  // critereid: [element.critereId],
  // filLocalid: [],
  // userid: ['3FA85F64-5717-4562-B3FC-2C963F66AFA7'],
  // ,
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
  updateplan(val: any) {
    return this.http.put(this.backEndUrl + '/Putplan_action', val, { responseType: "text" });
  }
}
