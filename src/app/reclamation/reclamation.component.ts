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
  isShown: boolean = false;
  filList: any;
  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      // console.log(this.filList)
    });

  }
  formCum = this.fb.group({
    filialeId: '00000000-0000-0000-0000-000000000000',
    filLocalid: '00000000-0000-0000-0000-000000000000',
    date_notation: ''
  });
  LocalList: any;
  refreshLocList() {
    //  debugger
    this.isShown = true;
    if (this.formCum.value.filialeId) {
      this.LocService.GetAllLocalByFilale(this.formCum.value.filialeId).subscribe(data => {
        this.LocalList = data;
        //  console.log(this.LocalList);

      });
    }
  }
  refrechNote() {

    this.noteService.GetAllNoteByLocal2(this.formCum.value.filialeId, this.formCum.value.filLocalid, this.formCum.value.date_notation).subscribe(data => {

      this.NoteList = data;
      console.log("allnote", this.NoteList)


    });



  }
  // ReclamationList: Array<{ Id: string, userId: string, image: string, comment: string, noteDate: Date }> = [
  //   { Id: "1", userId: "1", image: "", comment: "vous avez oubliez de ramasser la poubele", noteDate: new Date() },
  //   { Id: "1", userId: "1", image: "", comment: "vous avez oubliez de ramasser la poubele", noteDate: new Date() },
  //   { Id: "1", userId: "1", image: "", comment: "vous navez pas débarrassés de vieux posters", noteDate: new Date() },
  //   { Id: "1", userId: "1", image: "", comment: "vous avez oubliez de ramasser la poubele", noteDate: new Date() },
  // ];

  // PlanDaction: Array<{ Id: string, userId: string, userName: string, image: string, plandescription: string, PlanDate: Date }> = [
  //   { Id: "1", userId: "1", userName: "Safwen Mejed", image: "", plandescription: "Ranger le bureau ", PlanDate: new Date() },
  //   { Id: "1", userId: "1", image: "", userName: "Lamjed Mohamed", plandescription: "débarrasser les vieux posters", PlanDate: new Date() },
  //   { Id: "1", userId: "1", image: "", userName: "Sofiem Drifi", plandescription: "vous avez oubliez de ramasser la poubele", PlanDate: new Date() },
  //   { Id: "1", userId: "1", userName: "Safwen Mejed", image: "", plandescription: "Ranger le bureau ", PlanDate: new Date() },
  //   { Id: "1", userId: "1", image: "", userName: "Lamjed Mohamed", plandescription: "débarrasser les vieux posters", PlanDate: new Date() },
  //   { Id: "1", userId: "1", image: "", userName: "Sofiem Drifi", plandescription: "vous avez oubliez de ramasser la poubele", PlanDate: new Date() },
  // ];


  constructor(public planService: PlanActionService, public normeService: NormeServiceService, public LocService: LocalService, public noteService: NoteService, private router: Router, private fb: FormBuilder, private datePipe: DatePipe, public filialeService: FilialeService) { }
  disabled = false;

  ngOnInit(): void {
    this.refreshfilList();


  }
  NoteList: any
  planList: any

  // refrechNote() {
  //   this.noteService.GetAlltNote().subscribe(data => {
  //     this.NoteList = data;
  //     console.log("listnote", this.NoteList)

  //   });
  // }
  refrechplan(note: any) {
    this.planService.GetAllplanByNote(note.id).subscribe(data => {
      this.planList = data;
      console.log("ggg", this.planList[0])

    });
  }
  Noteget: any = []
  refrechgetNote(note: any) {
    this.noteService.getnotation(note.id).subscribe(data => {
      this.Noteget[note.index] = data;
      console.log("gggsss", this.Noteget)

    });

  }
  filialeget: any = []
  /* refrechgetfilaile() {
     this.filialeService.getfiliale(this.Localget.filialeid).subscribe(data => {
       this.filialeget[0] = data;
       console.log("filailz", this.filialeget)
 
     });
 
   }
   Localget: any = []
   refreshLocalget() {
     this.LocService.getlocal(this.Noteget.filLocalid).subscribe(data => {
       this.Localget[0] = data;
       console.log("Local", this.Localget)
 
     });
 
   }*/
}
