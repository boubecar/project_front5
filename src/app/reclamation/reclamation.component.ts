import { DatePipe } from '@angular/common';
import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';
import { NormeServiceService } from '../services/norme-service.service';
import { NoteService } from '../services/note.service';
import { PlanActionService } from '../services/plan-action.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css'],

})
export class ReclamationComponent implements OnInit {

  ReclamationList: Array<{ Id: string, userId: string, image: string, comment: string, noteDate: Date }> = [
    { Id: "1", userId: "1", image: "", comment: "vous avez oubliez de ramasser la poubele", noteDate: new Date() },
    { Id: "1", userId: "1", image: "", comment: "vous avez oubliez de ramasser la poubele", noteDate: new Date() },
    { Id: "1", userId: "1", image: "", comment: "vous navez pas débarrassés de vieux posters", noteDate: new Date() },
    { Id: "1", userId: "1", image: "", comment: "vous avez oubliez de ramasser la poubele", noteDate: new Date() },
  ];

  PlanDaction: Array<{ Id: string, userId: string, userName: string, image: string, plandescription: string, PlanDate: Date }> = [
    { Id: "1", userId: "1", userName: "Safwen Mejed", image: "", plandescription: "Ranger le bureau ", PlanDate: new Date() },
    { Id: "1", userId: "1", image: "", userName: "Lamjed Mohamed", plandescription: "débarrasser les vieux posters", PlanDate: new Date() },
    { Id: "1", userId: "1", image: "", userName: "Sofiem Drifi", plandescription: "vous avez oubliez de ramasser la poubele", PlanDate: new Date() },
    { Id: "1", userId: "1", userName: "Safwen Mejed", image: "", plandescription: "Ranger le bureau ", PlanDate: new Date() },
    { Id: "1", userId: "1", image: "", userName: "Lamjed Mohamed", plandescription: "débarrasser les vieux posters", PlanDate: new Date() },
    { Id: "1", userId: "1", image: "", userName: "Sofiem Drifi", plandescription: "vous avez oubliez de ramasser la poubele", PlanDate: new Date() },
  ];


  constructor(public planService: PlanActionService, public normeService: NormeServiceService, public LocService: LocalService, public noteService: NoteService, private router: Router, private fb: FormBuilder, private datePipe: DatePipe, public filialeService: FilialeService) { }
  disabled = false;

  ngOnInit(): void {
    this.refrechNote()
    this.refrechplan()
    this.refrechNote()
    this.refrechgetfilaile()
  }
  NoteList: any
  planList: any

  refrechNote() {
    this.noteService.GetAlltNote().subscribe(data => {
      this.NoteList = data;
      console.log("listnote", this.NoteList)

    });
  }
  refrechplan() {
    this.planService.GetAllplan_action().subscribe(data => {
      this.planList = data;
      //console.log("ggg", this.NoteList)

    });
  }
  Noteget: any
  refrechgetNote(note: any) {
    this.noteService.getnotation(note.id).subscribe(data => {
      this.Noteget = data;
      console.log("note", this.Noteget)

    });

  }
  filialeget: any
  refrechgetfilaile() {
    this.filialeService.getfiliale(this.Localget.filialeid).subscribe(data => {
      this.filialeget = data;
      console.log("filailz", this.filialeget)

    });

  }
  Localget: any
  refreshLocalget() {
    this.LocService.getlocal(this.Noteget.filLocalid).subscribe(data => {
      this.Localget = data;
      console.log("Local", this.Localget)

    });

  }
}
