import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { PlanActionService } from 'src/app/services/plan-action.service';

@Component({
  selector: 'app-note-user',
  templateUrl: './note-user.component.html',
  styleUrls: ['./note-user.component.css']
})
export class NoteUserComponent implements OnInit {
  NoteList:any
  Noteget: any

  currentDate = new Date();
  formCum = this.fb.group({
    filialeId: '00000000-0000-0000-0000-000000000000',
    filLocalid: '00000000-0000-0000-0000-000000000000',
    date_notation: ''
  });
  constructor(public planService: PlanActionService, public noteService: NoteService, private router: Router, private fb: FormBuilder,private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }
  refrechNote() {
    this.noteService.GetAllNoteByLocal(this.formCum.value.filLocalid).subscribe(data => {
      this.NoteList = data;
      console.log("ggg", this.NoteList)
      console.log("dd", this.Noteget)

    });

  }
}
