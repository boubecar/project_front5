import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Norme } from '../norme';
import { Note } from '../note';
import { CritereService } from '../services/critere.service';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';
import { NormeServiceService } from '../services/norme-service.service';
import { NoteService } from '../services/note.service';
import { PlanActionService } from '../services/plan-action.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [DatePipe]
})
export class NoteComponent implements OnInit {
  filList: any
  LocalList: any
  CritereList: any
  notation: any
  eval: string = ''
  isShown: boolean = false;
  /*
  NormeList: Array<{ NormeId: number, designation: string, path: string }> = [
    { NormeId: 1, designation: "Nettoyer", path: 'fa-paint-brush' },
    { NormeId: 2, designation: 'Ranger', path: 'fa-cubes' },
    { NormeId: 3, designation: 'Etre rigoureux', path: 'fa-balance-scale' },
    { NormeId: 4, designation: "Maintenir l'ordre", path: "fa-cubes" },
    { NormeId: 5, designation: "Débarrasser", path: 'fa-trash' },
  ]
  //NoteList: any
  /*CritereList: Array<{ critereId: number, criterelabel: string, normes: string }> = [
    { critereId: 1, criterelabel: "Nettoyer", normes: "" },
    { critereId: 2, criterelabel: 'Ranger', normes: "" },
    { critereId: 3, criterelabel: 'Etre rigoureux', normes: "" },
    { critereId: 4, criterelabel: "Maintenir l'ordre", normes: "" },
    { critereId: 5, criterelabel: "Débarrasser", normes: "" },
  ]; 
  NoteList: Array<{ Id: string, note: number, image: string, critereId: string, userId: string, FilLocallId: string, comment: string, criterelabel: string, eval: string }> = [
    { Id: "1", note: 20, image: "assets/images/mazraa.jpg", critereId: '', userId: '', FilLocallId: '', comment: 'blablabla', criterelabel: "Nettoyer", eval: "CR" },
    { Id: "2", note: 18, image: "assets/images/download.jpg", critereId: '', userId: '', FilLocallId: '', comment: 'blablabla', criterelabel: "Nettoyer", eval: "CM" },
    { Id: "3", note: 15, image: "assets/images/mazraa.jpg", critereId: '', userId: '', FilLocallId: '', comment: 'blablabla', criterelabel: "Nettoyer", eval: "" },
    { Id: "4", note: 13, image: "assets/images/download.jpg", critereId: '', userId: '', FilLocallId: '', comment: 'blablabla', criterelabel: "Nettoyer", eval: "" },
    { Id: "5", note: 5, image: "assets/images/oasis.jpg", critereId: '', userId: '', FilLocallId: '', comment: 'blablabla', criterelabel: "Nettoyer", eval: "" },
  ];*/

  isDisabled: boolean = true
  maintenant: string = ''
  //maDate = new Date();
  currentDate = new Date();




  maDate = new Date(2022, 0o1, 0o2);
  taw = this.maDate.setDate(this.maDate.getDate() + 4);
  PhotoFilePath: string = 'assets/images/inconu.png'
  note: boolean = false
  NoteList: any;
  NormeList: any;
  formCum = this.fb.group({
    filialeId: '00000000-0000-0000-0000-000000000000',
    filLocalid: '00000000-0000-0000-0000-000000000000',
  });
  constructor(public planService: PlanActionService, public normeService: NormeServiceService, public LocService: LocalService, public noteService: NoteService, private router: Router, private fb: FormBuilder, public CritereService: CritereService, private datePipe: DatePipe, public filialeService: FilialeService) {
    //this.maDate = this.datePipe.transform(this.maDate, 'dd/MM/yyyy');
  }

  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      console.log(this.filList)
    });

  }

  refreshLocList() {
    //  debugger
    this.isShown = true;
    if (this.formCum.value.filialeId) {
      this.LocService.GetAllLocalByFilale(this.formCum.value.filialeId).subscribe(data => {
        this.LocalList = data;
        console.log(this.LocalList);

      });
    }
  }
  refrechNote() {
    this.noteService.GetAllNoteByLocal(this.formCum.value.filLocalid).subscribe(data => {
      this.NoteList = data;
      console.log("ggg", this.NoteList)
    });

  }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
      console.log(this.NormeList)
    });
  }
  ngOnInit(): void {
    this.refreshnormList()
    this.maintenant = this.maDate.getDate() + '-' + ((this.maDate.getMonth() + 1)) + '-' + this.maDate.getFullYear();

    this.maintenant = this.addDays(4);
    this.refreshfilList();

  }
  pipe = new DatePipe('en-US');

  addDays(days: number): string {
    var futureDate = new Date();
    var taw: string = '';
    futureDate.setDate(futureDate.getDate() + days);
    taw = futureDate.getDate() + '/' + ((futureDate.getMonth() + 1)) + '/' + futureDate.getFullYear();

    return taw;
  }
  refreshcriList(e: any) {
    this.isShown = true;
    this.CritereService.getCritereByNorme(e.normeId).subscribe(data => {
      this.CritereList = data;
      console.log(this.CritereList)
    });

  }
  criterelabel: any


  ChangeData(note: Note) {

    /*this.noteService.formCum.controls['note'].disable();
    this.noteService.formCum.controls['Commentaire'].disable();
    this.noteService.formCum.controls['criterelabel'].disable();
*/

    // console.log(note);
    // this.noteService.formCum.reset({
    //   Id: note.Id,
    //   note: note.note,
    //   comment: note.comment,
    //   criterelabel: note.critereid
    // });

    //this.refreshnormList();



  }

  cumulative: any
  public saveData() {
    console.log('hello');
    console.log(this.planService.formCum.value);
    if (!this.planService.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    if (this.planService.formCum.controls['planId'].value == '00000000-0000-0000-0000-000000000000') {

      console.log("post")

      /*  this.cumulative = {
          planId: this.planService.formCum.controls['planId'].value,
          plandescription: this.planService.formCum.controls['plandescription'].value,
          image: this.planService.formCum.controls['image'].value,
          planDate: this.planService.formCum.controls['planDate'].value,
          notationid: this.planService.formCum.controls['notationid'].value,
        }*/
      //console.log(this.cumulative.value);
      // console.log(this.cumulative.value);
      this.planService.postRec(this.planService.formCum.value).subscribe(res => {
        alert(res.toString());
        //  this.cumulative={}
      })
    }

    console.log('hello');
    console.log(this.planService.formCum.value);
    // alert(this.cumulative.designation);
  }

}
