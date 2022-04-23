import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../note';
import { CritereService } from '../services/critere.service';
import { NormeServiceService } from '../services/norme-service.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [DatePipe]
})
export class NoteComponent implements OnInit {

  // CritereList:any

  eval: string = ''
  isShown: boolean = false;
  NormeList: Array<{ NormeId: number, designation: string, path: string }> = [
    { NormeId: 1, designation: "Nettoyer", path: 'fa-paint-brush' },
    { NormeId: 2, designation: 'Ranger', path: 'fa-cubes' },
    { NormeId: 3, designation: 'Etre rigoureux', path: 'fa-balance-scale' },
    { NormeId: 4, designation: "Maintenir l'ordre", path: "fa-cubes" },
    { NormeId: 5, designation: "Débarrasser", path: 'fa-trash' },
  ]
  CritereList: Array<{ critereId: number, criterelabel: string, normes: string }> = [
    { critereId: 1, criterelabel: "Nettoyer", normes: "" },
    { critereId: 2, criterelabel: 'Ranger', normes: "" },
    { critereId: 3, criterelabel: 'Etre rigoureux', normes: "" },
    { critereId: 4, criterelabel: "Maintenir l'ordre", normes: "" },
    { critereId: 5, criterelabel: "Débarrasser", normes: "" },
  ];
  NoteList: Array<{ Id: string, note: number, image: string, critereId: string, userId: string, FilLocallId: string, commentaire: string, criterelabel: string, }> = [
    { Id: "1", note: 20, image: "assets/images/mazraa.jpg", critereId: '', userId: '', FilLocallId: '', commentaire: 'blablabla', criterelabel: "Nettoyer", },
    { Id: "2", note: 18, image: "assets/images/download.jpg", critereId: '', userId: '', FilLocallId: '', commentaire: 'blablabla', criterelabel: "Nettoyer", },
    { Id: "3", note: 15, image: "assets/images/mazraa.jpg", critereId: '', userId: '', FilLocallId: '', commentaire: 'blablabla', criterelabel: "Nettoyer", },
    { Id: "4", note: 13, image: "assets/images/download.jpg", critereId: '', userId: '', FilLocallId: '', commentaire: 'blablabla', criterelabel: "Nettoyer", },
    { Id: "5", note: 5, image: "assets/images/oasis.jpg", critereId: '', userId: '', FilLocallId: '', commentaire: 'blablabla', criterelabel: "Nettoyer", },
  ];
  maintenant: string = ''
  maDate = new Date(2019, 0o1, 0o2);

  constructor(public noteService: NoteService, private router: Router, private fb: FormBuilder, public CritereService: CritereService, private datePipe: DatePipe) {

  }



  ngOnInit(): void {
    this.maintenant = this.maDate.getDate() + '-' + ((this.maDate.getMonth() + 1)) + '-' + this.maDate.getFullYear();
  }
  refreshcriList(e: any) {
    this.isShown = true;
    this.CritereService.getCritereByNorme(e.NormeId).subscribe(data => {
      //this.CritereList = data;
      console.log(this.CritereList)
    });

  }


  ChangeData(note: Note) {

    this.noteService.formCum.controls['note'].disable();
    this.noteService.formCum.controls['Commentaire'].disable();
    this.noteService.formCum.controls['criterelabel'].disable();

    this.noteService.formCum.reset({
      Id: note.Id,
      note: note.note,
      image: note.image,
      criterelabel: note.criterelabel,
      Commentaire: note.commentaire
    });
    //this.refreshnormList();



  }
  saveData() {

  }
}
