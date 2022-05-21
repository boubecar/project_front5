import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Filiale } from '../filiale';
import { groupedCriterionDTO } from '../groupedCriterionDTO';
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
  today = new Date()

  AddOrEditNotationForm = this.fb.group({
    NoteArray: this.fb.array([]),
  });
/* Change  Image */ 
PhotoFileName: string = ""
PhotoFilePath:string='https://png.pngtree.com/png-vector/20191129/ourlarge/pngtree-image-upload-icon-photo-upload-icon-png-image_2047547.jpg'
//PhotoFilePath: string = 'https://cdn3.sosav.fr/store/69879-large_default/plaque-metallique-de-protection-des-nappes-du-lcd-iphone-6.jpg'
  
  formCum = this.fb.group({
    filialeId: '00000000-0000-0000-0000-000000000000',
    filLocalid: '00000000-0000-0000-0000-000000000000',
    date_notation: this.datePipe.transform(this.today, "yyyy-MM-dd"),
    image: '',
  });
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
    listCriterion.forEach((element: any) => {
      this.controlArray.push(this.fb.group({
        id: '00000000-0000-0000-0000-000000000000',
        note: '',
        comment: [],
        date_notation: ['', Validators.required],
        critereid: [element.critereId],
        filLocalid: [],
        userid: ['b9f90383-21fc-4dff-0a47-08da38d5e1b1'],
        image: [],

        //  index:0,
        criterionLabel: [element.criterelabel]
      })
      )
    })

  }
  /*addSkills() {
    // this.skills.push(this.newNote());
  }
  onSubmit() {
    console.log(this.NotationForm.value);
  }*/

  // Form Array //

  constructor(private router: Router, public fb: FormBuilder, private normeService: NormeServiceService, public CritereService: CritereService, public filialeService: FilialeService,
    public LocService: LocalService, public noteService: NoteService, public datePipe: DatePipe) {
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
  FilLocallId: String = ''
  commentaire: String = ''
  eval: String = ''
  selectedObject1: any;
  data: any;
  Userid: String = ''
  noteDate: String = ''
  /* filList: Array<{ filialeId: string, filialeId: string, image: string }> = [
     { filialeId: "1", filialeId: "Mazraa", image: "assets/images/mazraa.jpg" },
     { filialeId: "1", filialeId: 'Jadida ', image: "assets/images/download.jpg" },
     { filialeId: "1", filialeId: ' Gan', image: "assets/images/alimentation-animale.png" },
     { filialeId: "1", filialeId: "Med oil", image: "assets/images/alimentation-animale.png" },
     { filialeId: "1", filialeId: "oasis", image: "assets/images/oasis.jpg" },
   ];
   LocalList: Array<{ filialeId: string, localdescription: string, image: string }> = [
     { filialeId: "1", localdescription: "Zahra", image: "assets/images/mazraa.jpg" },
     { filialeId: "1", localdescription: 'Mouroug ', image: "assets/images/download.jpg" },
     { filialeId: "1", localdescription: ' Rades', image: "assets/images/alimentation-animale.png" },
     { filialeId: "1", localdescription: "Tunis", image: "assets/images/alimentation-animale.png" },
     { filialeId: "1", localdescription: "wardia", image: "assets/images/oasis.jpg" },
   ];*/

  
  selectedObject: any;
  comment: any;
  date = new Date;
  ngOnInit(): void {
    this.refreshnormList()
    this.refreshfilList();
    console.log(this.controlArray.controls);

  }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
      console.log(this.NormeList)
    });
  }



  /*change Image  */
  
  uploadPhoto(e: any) {
   
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (evant: any) => {
        this.PhotoFilePath = evant.target.result;
      }
    }
    console.log("photo")
    console.log(this.formCum.controls['image'].value)
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
    this.isShown = true;
    if (this.formCum.value.filialeId) {
      this.LocService.GetAllLocalByFilale(this.formCum.value.filialeId).subscribe(data => {
        this.LocalList = data;
        console.log(this.LocalList);
      });
    }


  }
  refreshcriList(e: any) {
    this.CritereService.getCritereByNorme(e.normeid).subscribe(data => {
      this.CritereList = data;
      console.log('oui')
      console.log(this.CritereList)
    });
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
          this.buildFormNotation(group.criterionDTOs)
          console.log("array =" + this.controlArray.controls[0].value.critereid);
          //  console.log("list", group.criterionDTOs);
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
    console.log('local ',this.formCum.value.filLocalid);
    this.controlArray.controls.forEach((form: any) => { form['controls'].date_notation.setValue(this.formCum.value.date_notation) });
    this.controlArray.controls.forEach((form: any) => { form['controls'].filLocalid.setValue(this.formCum.value.filLocalid) });

    this.controlArray.controls.forEach((element: any, i: Number) => {
      console.log('note',element.value.note);
      if (element.value.note != null) {
        this.noteService.postNote(element.value).subscribe(
          res => {

            if (res == "Added done") {
              // debugger
              for (let i = this.controlArray.length - 1; i >= 0; i--) {
                this.controlArray.removeAt(i)
                element.reset()
              }
              Swal.fire({
                position: 'top-end',
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

          }
        )
      }
    });
  }
}
