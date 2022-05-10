import { Component, OnInit } from '@angular/core';
import { Filiale } from '../filiale';
import { Note } from '../note';
import { CritereService } from '../services/critere.service';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';
import { NormeServiceService } from '../services/norme-service.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  NormeList: any = []
  CritereList: any = []
  /*NormeList: Array<{ NormeId: number, designation: string, path: string }> = [
    { NormeId: 1, designation: "Nettoyer", path: 'fa-paint-brush' },
    { NormeId: 2, designation: 'Ranger', path: 'fa-cubes' },
    { NormeId: 3, designation: 'Etre rigoureux', path: 'fa-balance-scale' },
    { NormeId: 4, designation: "Maintenir l'ordre", path: "fa-cubes" },
    { NormeId: 5, designation: "Débarrasser", path: 'fa-trash' },
  ]

  /*CritereList: Array<{ critereId: number, criterelabel: string, normes: string }> = [
    { critereId: 1, criterelabel: "Nettoyer", normes: "" },
    { critereId: 2, criterelabel: 'Ranger', normes: "" },
    { critereId: 3, criterelabel: 'Etre rigoureux', normes: "" },
    { critereId: 4, criterelabel: "Maintenir l'ordre", normes: "" },
    { critereId: 5, criterelabel: "Débarrasser", normes: "" },
  ];*/
  isShown: boolean = false;
  note: number = 0;
  isShown1: boolean = false;
  PhotoFilePath: String = ''
  FilLocallId: String = ''
  commentaire: String = ''
  eval: String = '' 
  selectedObject1: any;
  data: any;
  Userid: String = ''
  noteDate: String = ''
  filList: Array<{filialeId: string, filialName: string,image:string}> = [
   {filialeId: "1", filialName: "Mazraa",image:"assets/images/mazraa.jpg"},
   {filialeId: "1", filialName: 'Jadida ',image:"assets/images/download.jpg"},
   {filialeId: "1", filialName: ' Gan',image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", filialName: "Med oil",image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", filialName: "oasis",image:"assets/images/oasis.jpg"},
 ];
 /*LocalList: Array<{filialeId: string, localdescription: string,image:string}> = [
   {filialeId: "1", localdescription: "Zahra",image:"assets/images/mazraa.jpg"},
   {filialeId: "1", localdescription: 'Mouroug ',image:"assets/images/download.jpg"},
   {filialeId: "1", localdescription: ' Rades',image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", localdescription: "Tunis",image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", localdescription: "wardia",image:"assets/images/oasis.jpg"},
 ];*/
//  filList: any
  LocalList: any
  //constructor(public normeService: NormeServiceService, public CritereService: CritereService, public filialeService: FilialeService, public LocService: LocalService) { }

  selectedObject: any;
  comment: any;
  /*filList: Array<{ filialeId: string, filialName: string, image: string }> = [
    { filialeId: "1", filialName: "Mazraa", image: "assets/images/mazraa.jpg" },
    { filialeId: "1", filialName: 'Jadida ', image: "assets/images/download.jpg" },
    { filialeId: "1", filialName: ' Gan', image: "assets/images/alimentation-animale.png" },
    { filialeId: "1", filialName: "Med oil", image: "assets/images/alimentation-animale.png" },
    { filialeId: "1", filialName: "oasis", image: "assets/images/oasis.jpg" },
  ];
  LocalList: Array<{ filialeId: string, localdescription: string, image: string }> = [
    { filialeId: "1", localdescription: "Zahra", image: "assets/images/mazraa.jpg" },
    { filialeId: "1", localdescription: 'Mouroug ', image: "assets/images/download.jpg" },
    { filialeId: "1", localdescription: ' Rades', image: "assets/images/alimentation-animale.png" },
    { filialeId: "1", localdescription: "Tunis", image: "assets/images/alimentation-animale.png" },
    { filialeId: "1", localdescription: "wardia", image: "assets/images/oasis.jpg" },
  ];*/
  //filList:any
  //LocalList:any
  constructor(public normeService: NormeServiceService, public CritereService: CritereService, public filialeService: FilialeService, public LocService: LocalService, public noteService: NoteService) { }

  ngOnInit(): void {
    this.refreshnormList()
    this.refreshfilList();

  }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
      console.log(this.NormeList)
    });
  }
  refreshcriList(e: any) {
    this.isShown1 = true;
    this.CritereService.getCritereByNorme(e.normeId).subscribe(data => {
      this.CritereList = data;

      console.log(this.CritereList)
    });
    console.log("dd")
  }
  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      console.log(this.filList)
    });

  }
  refreshLocList(data: Filiale) {
    console.log("hhhhh")
    console.log(data.filialId)
    this.isShown = true;
    this.LocService.GetAllLocalByFilale(data.filialId).subscribe(data => {
      this.LocalList = data;
      console.log("hiii");
      console.log(this.LocalList);
    });




    console.log("hello");
    console.log(this.data)
    console.log('lll')
    console.log(this.selectedObject1)
  }

  mention() {
    switch (this.note) {
      case 0:
        { this.eval = "CR"; break }
      case 10:
        { this.eval = "MA"; break }
      case 15:
        { this.eval = "MI"; break }
      case 18:
        { this.eval = "CO"; break }
      default:
        { this.eval = "NA"; break }
    }
    console.log(this.note)
  }
  cumulative: any
  image: string = ''
  Id: string = ''
  critere: string = 'b99488be-96fe-4d7c-055b-08da28bfeb78'
  cumulative1: Note = {}
  notation() {
    this.cumulative = {
      id: this.Id,

      commentaire: this.comment,
      note: this.note,
      noteDate: this.noteDate,

      critereid: this.critere,
      image: this.image,
      Userid: this.Userid,
      evaluer: this.eval,
      FilLocallId: this.selectedObject1,





    }
    this.noteService.postNote(this.cumulative).subscribe(res => {
      alert(res.toString());
      //  this.cumulative={}
    })
    console.log('hhhh')
    console.log(this.cumulative)
  }

}
