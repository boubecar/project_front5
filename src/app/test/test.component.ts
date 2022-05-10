import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Filiale } from '../filiale';
import { Norme } from '../norme';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';
import { NormeServiceService } from '../services/norme-service.service';
import { FormControl, FormArray } from '@angular/forms'
import { CritereService } from '../services/critere.service';
import { groupedCriterionDTO } from '../groupedCriterionDTO';
import { NoteService } from '../services/note.service';
import { Critere } from '../critere';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  // Form Array //
  /* NotationForm = this.fb.group({
     Note: this.fb.array([]),
   });
  filList: any
   LocalList: any
   NormeList: any
   CritereList: any
   get skills(): FormArray {
     return this.NotationForm.get("Note") as FormArray
   }*/
  AddOrEditNotationForm = this.fb.group({
    NoteArray: this.fb.array([]),
  });

  formCum = this.fb.group({
    localdescription: '',
    filialName: '',
    Date: '',
  });
  datePipe: any;
  //ObjectArray: any;

  get controlArray(): FormArray {
    return this.AddOrEditNotationForm.get('NoteArray') as FormArray;
  }
  filList: any
  LocalList: any
  NormeList: any
  CritereList: any
  /* buildFormNotation(list: any) {
     list.array.forEach(() => {
       this.skills.push(this.fb.group({
         Id: ["00000000-0000-0000-0000-000000000000"],
         note: [""],
         image: [""],
         critereid: [list.critereid],
         comment: [""],
         noteDate: [""],
         Userid: [''],
         FilLocalid: ['']
       }))
     });
     console.log("ee")
     console.log(this.skills)
   }*/
  buildFormNotation(listCriterion: any) {
    debugger
    listCriterion.forEach((element: any) => {
      this.controlArray.push(this.fb.group({
        id: '00000000-0000-0000-0000-000000000000',
        note: 0,
        comment: [],
        date: ['', Validators.required],
        critereid: [element.critereId],
        FilLocalid: [],
        Userid: ['60fc1633-b1a0-46a3-fbf4-02da28c41eff'],
        image: [],

        //  index:0,
        criterionLabel: [element.criterelabel]
      })
      )
    })

  }
  today(today: any, arg1: string): any {
    throw new Error('Method not implemented.');
  }
  /*addSkills() {
    // this.skills.push(this.newNote());
  }
  onSubmit() {
    console.log(this.NotationForm.value);
  }*/

  // Form Array //

  constructor(private router: Router, public fb: FormBuilder, private normeService: NormeServiceService, public CritereService: CritereService, public filialeService: FilialeService, public LocService: LocalService, public noteService: NoteService) {
  }
  //NormeList: any = []
  //CritereList: any = []
  /*NormeList: Array<{ NormeId: number, designation: string, path: string }> = [
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
  /* filList: Array<{ filialeId: string, filialName: string, image: string }> = [
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

  // constructor(public normeService: NormeServiceService, public CritereService: CritereService, public filialeService: FilialeService, public LocService: LocalService) { }

  selectedObject: any;
  comment: any;
  date = new Date;
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

  // refreshcriList(e: any) {

  //   this.isShown1 = true;
  //   this.CritereService.getCritereByNorme(e.normeId).subscribe(data => {
  //     this.CritereList = data;
  //     console.log(this.CritereList)
  //   });
  // }

  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      console.log(this.filList)
    });

  }

  refreshLocList() {
    //  debugger
    console.log("hhhhh")
    console.log(this.formCum.value.filialName)
    this.isShown = true;
    if (this.formCum.value.filialName) {
      this.LocService.GetAllLocalByFilale(this.formCum.value.filialName).subscribe(data => {
        this.LocalList = data;
        console.log("hiii");
        console.log(this.LocalList);
      });
    }






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
  listGroupedCriterions: any;

  onChangeCriterion() {
    this.CritereService.getGroupedCriterion().subscribe(
      res => {
        // debugger
        this.listGroupedCriterions = res as groupedCriterionDTO[]
        this.listGroupedCriterions.forEach((group: any) => {
          alert(group)
          this.buildFormNotation(group.criterionDTOs)

          console.log("list", group.criterionDTOs);
        });
      }
    )
  }

  /*onSubmit() {

    console.log('hhhh')

    console.log(this.AddOrEditNotationForm.value)
    this.noteService.postNote(this.AddOrEditNotationForm.value).subscribe(res => {
      alert(res.toString());
      //  this.cumulative={}
    })
    console.log('hhhh')

  }*/
  onSubmit() {

    this.controlArray.controls.forEach(form => { form.setValue(this.formCum.value.Date) });
    this.controlArray.controls.forEach(form => { form.setValue(this.formCum.value.localdescription) });

    this.controlArray.controls.forEach((element, i) => {

      if (element.value.note != null) {
        this.noteService.postNote(element.value).subscribe(
          res => {

            if (res == "Added done") {
              // debugger
              //  for (let i = this.ObjectArray.length - 1; i >= 0; i--) {
              // this.ObjectArray.removeAt(i)
              element.reset()
              //   }
              /// Swal.fire('l\'ajout est effectuée avec succèes')
            }

          }
        )
      }
    });
  }
}
