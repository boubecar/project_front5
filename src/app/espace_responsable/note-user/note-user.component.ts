import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    filialeId: '00000000-0000-0000-0000-000000000000',
    filLocalid: '00000000-0000-0000-0000-000000000000',
    date_notation: ''
  });
  constructor(public planService: PlanActionService, public normeService: NormeServiceService, public LocService: LocalService, public noteService: NoteService, private router: Router, private fb: FormBuilder, public CritereService: CritereService, private datePipe: DatePipe, public filialeService: FilialeService) {
  }

  ngOnInit(): void {

    this.refreshnormList()
    this.maintenant = this.maDate.getDate() + '-' + ((this.maDate.getMonth() + 1)) + '-' + this.maDate.getFullYear();

    this.maintenant = this.addDays(4);
    this.refreshfilList();

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
    this.noteService.GetAllNoteByLocal(this.formCum.value.filLocalid).subscribe(data => {
      this.NoteList = data;
    //  console.log("allnote", this.NoteList)

    });

  }
  cri: any
  refrechcritere(e: any) {
    
    this.CritereService.getcriteres(e.critereid).subscribe(data => {
      this.cri = data;

    });
    this.refreshSum();

  }
  Noteget: any
  refrechgetNote(note: any) {
    this.noteService.getnotation(note.id).subscribe(data => {
      this.Noteget = data;
      console.log("gggsss", this.Noteget)

    });

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
    this.noteService.GetSum(this.formCum.value.filLocalid).subscribe(data => {
      this.sum = data;
      //alert("sum"+ this.sum)
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

  cumulative: any
  public saveData() {

    if (!this.planService.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    if (this.planService.formCum.controls['planid'].value == '00000000-0000-0000-0000-000000000000') {
      this.planService.formCum.controls['notationid'].setValue(this.Noteget.id);
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

    // alert(this.cumulative.designation);
  }

}
