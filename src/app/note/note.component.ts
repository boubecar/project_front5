import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Critere } from '../critere';
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
  @Input() id: String = ""
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
    date_notation: ''
  });
  constructor(public planService: PlanActionService, public normeService: NormeServiceService, public LocService: LocalService, public noteService: NoteService, private router: Router, private fb: FormBuilder, public CritereService: CritereService, private datePipe: DatePipe, public filialeService: FilialeService) {
    //this.maDate = this.datePipe.transform(this.maDate, 'dd/MM/yyyy');

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

  cri: any
  List:Critere []=[]
  refrechNote() {
    this.noteService.GetAllNoteByLocal(this.formCum.value.filLocalid).subscribe(data => {
      this.NoteList = data;
      console.log("allnote", this.NoteList)
      //console.log(this.NoteList)

    });
    for (let i of this.NoteList)
    {
      this.CritereService.getcriteres(i.critereid).subscribe(data => {
        this.cri = data;
        this.List.push(this.cri)
        console.log('"list cri',this.List)
      });
    }
  }
 
  refrechcritere(e: any) {
    this.CritereService.getcriteres(e.critereid).subscribe(data => {
      this.cri = data;

    });
   /* for (let i of this.NoteList)
    {
      this.CritereService.getcriteres(i.critereid).subscribe(data => {
        this.cri = data;
        this.List.push(this.cri)
      });
    }*/
    this.refreshSum();

  }
  Noteget: any
  refrechgetNote(note: any) {
    this.noteService.getnotation(note.id).subscribe(data => {
      this.Noteget = data;
      console.log("gggsss", this.Noteget)

    });

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
  ngOnInit(): void {
    this.refreshSum()

    this.refreshnormList()
    this.maintenant = this.maDate.getDate() + '-' + ((this.maDate.getMonth() + 1)) + '-' + this.maDate.getFullYear();

    this.maintenant = this.addDays(4);
    this.refreshfilList();

  }
  EditNote()
  {
    this.router.navigateByUrl('/evaluation')
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
    this.noteService.GetSum(this.formCum.value.filLocalid).subscribe(data => {
      this.sum = data;
      console.log("sum", this.sum)
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
      this.filialeService.filList = this.filialeService.filList.filter((res: { date_notation: Date; }) => {
        return res.date_notation.getDate().toLocaleString(this.formCum.controls['noteDate'].value.getDate());
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
