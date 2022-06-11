import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { Note } from 'src/app/note';
import { CritereService } from 'src/app/services/critere.service';
import { FilialeService } from 'src/app/services/filiale.service';
import { LocalService } from 'src/app/services/local.service';
import { NormeServiceService } from 'src/app/services/norme-service.service';
import { NoteService } from 'src/app/services/note.service';
import { PlanActionService } from 'src/app/services/plan-action.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-note-user',
  templateUrl: './note-user.component.html',
  styleUrls: ['./note-user.component.css']
})
export class NoteUserComponent implements OnInit {

  filList: any
  LocalList: any
  CritereList: any
  notation: any
  eval: string = ''
  isShown: boolean = false;
  @Input() id: String = ""

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
    filLocalid: '00000000-0000-0000-0000-000000000000',
    date_notation: ''
  });
  planList: any;
  constructor(public planService: PlanActionService, public normeService: NormeServiceService, public LocService: LocalService, public noteService: NoteService, private router: Router, private fb: FormBuilder, public CritereService: CritereService, private datePipe: DatePipe, public filialeService: FilialeService) {
  }

  ngOnInit(): void {

    this.refreshnormList()
    this.maintenant = this.maDate.getDate() + '-' + ((this.maDate.getMonth() + 1)) + '-' + this.maDate.getFullYear();

    this.maintenant = this.addDays(4);
    this.refreshLocList();


  }
  /*
    refrechcritere() {
     for (let i of this.NoteList) {
       this.CritereService.getcriteres(i.critereid).subscribe(data => {
         this.cri = data;
         this.list += this.cri
         console.log('verify', this.list)
       });
 
     }*/
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
      console.log(this.NormeList)
    });
  }
  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      // console.log(this.filList)
    });

  }

  refreshLocList() {

    this.isShown = true;
    if (this.user.filalelId) {
      this.LocService.GetAllLocalByFilale(this.user.filalelId).subscribe(data => {
        this.LocalList = data;
        console.log(this.LocalList);

      });
    }
  }

  refrechNote() {
    this.sum = 0

    this.noteService.GetAllNoteByLocal2(this.user.filalelId, this.formCum.value.filLocalid, this.formCum.value.date_notation).subscribe(data => {

      this.NoteList = data;

    });
    console.log("allnote", this.NoteList)



  }

  cri: any
  refrechcritere(e: any) {

    this.CritereService.getcriteres(e.critereid).subscribe(data => {
      this.cri = data;

    });
    this.refreshSum();

  }
  Noteget: any = []
  refrechgetNote(note: any, event: any) {
    this.Noteget = []
    this.noteService.getnotation(note.id).subscribe(data => {
      this.Noteget[note.index] = data;
      console.log("note", this.Noteget)

    });
    return this.Noteget
  }
  cri2: any
  refrechcritere2(e: any) {
    this.CritereService.getcriteres(e.critereid).subscribe(data => {
      this.cri2 = data;

    });


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
      console.log('ggg', this.CritereList)
    });

  }
  sum: any;
  refreshSum() {
    console.log("summmmmmm")
    this.noteService.GetSum2(this.user.filalelId, this.formCum.value.filLocalid, this.formCum.value.date_notation).subscribe(data => {
      this.sum = data;
      console.log("sum", this.sum)
    });

  }
  criterelabel: any
  today = new Date();
  to = this.datePipe.transform(this.today, "dd")
  ChangeData(note: any) {

    console.log(note)
    this.planService.GetAllplanByNote(note.id).subscribe(data => {
      this.planList = data;
      console.log("ggg", this.planList[0])


      if (this.planList.length > 0) {
        this.planService.formCum.reset({
          planId: this.planList[0].planId,
          notationid: [this.planList[0].notationid],
          plandescription: [this.planList[0].plandescription],
          image: this.planList[0].image,
          planDate: this.datePipe.transform(this.planList[0].planDate, "yyyy-MM-dd"),
          userid: this.planList[0].userid,
        });
        console.log("ggg", this.to)
        this.planService.formCum.controls['planDate'].disable();
        if (Number(this.datePipe.transform(this.planList[0].planDate, "dd")) < Number(this.to)) {
          this.planService.formCum.disable();
        }
      }
    });
  }

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





  //noteDate: any
  SearchDate() {
    if (this.formCum.controls['noteDate'].value == '') {
      this.ngOnInit()
    } else {
      this.filialeService.filList = this.filialeService.filList.filter((res: { noteDate: Date; }) => {
        return res.noteDate.getDate().toLocaleString(this.formCum.controls['noteDate'].value.getDate());
      })
    }
  }
  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}') as User;
  }
  cumulative: any
  public saveData() {
    debugger

    if (!this.planService.formCum.valid) {
      alert("Vous Avez Depasser Le Date ")
    }
    if (this.planService.formCum.controls['planId'].value == '00000000-0000-0000-0000-000000000000') {
      console.log('id', this.Noteget[0][0].id)
      this.planService.formCum.controls['notationid'].setValue(this.Noteget[0][0].id);
      this.planService.formCum.controls['userid'].setValue(this.user.id);

      console.log('ggg', this.planService.formCum.value)
      this.planService.postRec(this.planService.formCum.value).subscribe(res => {
        if (res == "Added done") {
          // 

          Swal.fire({

            icon: 'success',
            title: 'l\'ajout est effectuée avec succèes',
            showConfirmButton: false,
            timer: 1500
          })
          //  Swal.fire('l\'ajout est effectuée avec succèes')
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res,
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      })
    }
    else {

      console.log('id', this.Noteget[0][0].id)
      this.planService.formCum.controls['notationid'].setValue(this.Noteget[0][0].id);
      this.planService.formCum.controls['userid'].setValue(this.user.id);

      console.log('ggg', this.planService.formCum.value)
      this.planService.updateplan(this.planService.formCum.value).subscribe(res => {
        this.planService.formCum.disable()
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Modification est effectuée avec succèes',
          showConfirmButton: false,
          timer: 1500
        })
      })

      // alert(this.cumulative.designation);

    }
  }
}

