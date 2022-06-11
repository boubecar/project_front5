import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Filiale } from '../filiale';
import { groupedCriterionDTO } from '../groupedCriterionDTO';
import { Constants } from '../Helper/constants';
import { User } from '../Models/user';
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
    NoteArray: this.fb.array([])
  });

  /* Change  Image */
  PhotoFileName: string = ""
  PhotoFilePath: string = 'https://png.pngtree.com/png-vector/20191129/ourlarge/pngtree-image-upload-icon-photo-upload-icon-png-image_2047547.jpg'
  //PhotoFilePath: string = 'https://cdn3.sosav.fr/store/69879-large_default/plaque-metallique-de-protection-des-nappes-du-lcd-iphone-6.jpg'

  formCum = this.fb.group({
    filialeId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    filLocalid: ['00000000-0000-0000-0000-000000000000', Validators.required],
    date_notation: [''],
    //  image: '',
  });
  //ObjectArray: any;this.datePipe.transform(this.today, "yyyy-MM-dd"), Validators.required

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

  refrechall() {
    this.noteService.GetAlltNote(this.formCum.value.filialeId, this.formCum.value.filLocalid, this.formCum.value.date_notation)
      .subscribe(data => {
        this.allnote = data as any[];
        if (this.controlArray.length > 0) {
          for (let i = this.controlArray.length - 1; i >= 0; i--) {
            (this.AddOrEditNotationForm.get('NoteArray') as FormArray).removeAt(i)
          }
        }

      });
  }


  buildFormNotation(listCriterion: any) {
    //   debugger
    if (this.formCum.value.filialeId != '00000000-0000-0000-0000-000000000000' &&
      this.formCum.value.filLocalid != '00000000-0000-0000-0000-000000000000' &&
      this.formCum.value.date_notation != '') {

      this.controlArray.enable()

      // if (this.controlArray.length > 0) {
      //   for (let i = this.controlArray.length - 1; i >= 0; i--) {
      //     (this.AddOrEditNotationForm.get('NoteArray') as FormArray).removeAt(i)
      //   }
      // }

      // this.noteService.GetAlltNote(this.formCum.value.filialeId, this.formCum.value.filLocalid, this.formCum.value.date_notation)
      //   .subscribe(data => {
      //     this.allnote = data as any[];

      if (this.allnote.length > 0) {
        // if (this.controlArray.length > 0) {
        //   for (let i = this.controlArray.length - 1; i >= 0; i--) {
        //     (this.AddOrEditNotationForm.get('NoteArray') as FormArray).removeAt(i)
        //   }
        // }



        for (let i = 0; i < this.allnote.length; i++) {


          listCriterion.forEach((element: any) => {
            //     debugger
            console.log('element.critereId', element.critereId)
            if (element.critereId == this.allnote[i].critereid) {
              (this.AddOrEditNotationForm.get('NoteArray') as FormArray).push
                (
                  // new FormGroup({
                  //   id: new FormControl(this.allnote[i].id),
                  //   note: new FormControl(this.allnote[i].note),
                  //   comment: new FormControl(this.allnote[i].comment),
                  //   date_notation: new FormControl(this.allnote[i].date_notation),
                  //   critereid: new FormControl(this.allnote[i].critereid),
                  //   filLocalid: new FormControl(this.allnote[i].filLocalid),
                  //   userid: new FormControl(this.allnote[i].userid),
                  //   image: new FormControl(this.allnote[i].image),
                  //   eval: new FormControl(this.allnote[i].eval),
                  //   criterionLabel: new FormControl(this.allnote[i].criterionLabel),
                  // })

                  this.fb.group({
                    id: [this.allnote[i].id],
                    note: [this.allnote[i].note],
                    comment: [this.allnote[i].comment],
                    date_notation: [this.allnote[i].date_notation],
                    critereid: [this.allnote[i].critereid],
                    filLocalid: [this.allnote[i].filLocalid],
                    userid: [this.allnote[i].userid],
                    image: [this.allnote[i].image],
                    eval: [this.allnote[i].eval],
                    criterionLabel: [this.allnote[i].criterelabel]
                  })
                )
              // debugger
              //   this.controlArray.disable()
              // if (this.allnote[i].note != 0 && this.allnote[i].comment != '') {
              //    ((this.AddOrEditNotationForm.get('NoteArray') as FormArray).at(i) as FormGroup).disable()
              // }
            }
          })
          // }
        }


      }
      else {
        if (listCriterion.length > 0) {
          listCriterion.forEach((element: any) => {
            (this.AddOrEditNotationForm.get('NoteArray') as FormArray).push(this.fb.group({
              id: ['00000000-0000-0000-0000-000000000000'],
              note: [0],
              comment: [''],
              date_notation: ['', Validators.required],
              critereid: [element.critereId],
              filLocalid: [],
              userid: [''],
              image: [],
              eval: [''],
              criterionLabel: [element.criterelabel]
            })
            )
          })
        }

      }
      // });

    }


  }


  // }


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

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}') as User;
  }
  selectedObject: any;
  comment: any;
  date = new Date;
  users: any;
  allnote: any;
  bol: boolean = true
  listGroupedCriterions: any = [];

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}')
    console.log(this.users.id)
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
      console.log('fils',this.filList)
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
    //
  }

  // refreshAllnote() {
  //   this.noteService.GetAlltNote(this.formCum.value.filialeId, this.formCum.value.filLocalid, this.formCum.value.date_notation)
  //     .subscribe(data => {
  //       this.allnote = data;
  //       console.log('allnoteddd', this.allnote)
  //       //   for (let i = 0; i < this.allnote.length; i++) {
  //       //     this.allnote[i].date_notation = this.datePipe.transform(this.allnote[i].date_notation, "yyyy-MM-dd")
  //       //     console.log('allnoteddd', this.allnote[i].date_notation)
  //       //   }
  //       //   console.log('allnote')
  //       //   console.log(this.allnote)
  //       //   if (this.allnote[0].date_notation == this.formCum.value.date_notation) {
  //       //     this.bol = false;
  //       //     console.log('bol', this.bol)
  //       //   }
  //     });
  // }
  // mention(element: any, i: number) {
  //   this.controlArray.controls.forEach((form: any) => { form['controls'].eval.setValue(null) });

  //   debugger
  //   //  this.controlArray.controls.forEach((element: any, i: Number) => {
  //   let note = Number(element.target.value)
  //   switch (note) {
  //     case 0:
  //       {
  //         this.controlArray.controls.forEach((form: any) => { form['controls'].eval.setValue("CR") });
  //         break
  //       }
  //     case 10:
  //       { this.controlArray.controls.forEach((form: any = []) => { form['controls'].eval.setValue("MA") }); break }
  //     case 15:
  //       { this.controlArray.controls.forEach((form: any) => { form['controls'].eval.setValue("MI") }); break }
  //     case 18:
  //       { this.controlArray.controls.forEach((form: any) => { form['controls'].eval.setValue("CO") }); break }
  //     default:
  //       { this.controlArray.controls.forEach((form: any) => { form['controls'].eval.setValue("NA") }); break }
  //   }
  //   console.log(this.formCum.value.note)
  //   console.log('eval2', this.formCum.value.eval)

  //   //   })
  // }


  mention(element: any, i: number) {
    ((this.AddOrEditNotationForm.get('NoteArray') as FormArray).at(i) as FormGroup).controls['eval'].setValue(null)
    // this.controlArray.controls[i].setValue("teestrr").eval  
    //  this.planService.formCum.controls['notationid'].setValue(this.Noteget[0][0].id);

    //  debugger
    //  this.controlArray.controls.forEach((element: any, i: Number) => {
    let note = Number(element.target.value)
    switch (note) {
      case 0:
        {
          ((this.AddOrEditNotationForm.get('NoteArray') as FormArray).at(i) as FormGroup).controls['eval'].setValue("CR")
          break
        }
      case 10:
        {
          ((this.AddOrEditNotationForm.get('NoteArray') as FormArray).at(i) as FormGroup).controls['eval'].setValue("MA")
            ; break
        }


      case 15:
        {
          ((this.AddOrEditNotationForm.get('NoteArray') as FormArray).at(i) as FormGroup).controls['eval'].setValue("MI")
          break
        }
      case 18:
        {
          ((this.AddOrEditNotationForm.get('NoteArray') as FormArray).at(i) as FormGroup).controls['eval'].setValue("CO")
          break
        }
      default:
        {

          ((this.AddOrEditNotationForm.get('NoteArray') as FormArray).at(i) as FormGroup).controls['eval'].setValue("NA")
          break
        }
    }
    //  console.log(this.formCum.value.note)
    console.log('eval2', this.controlArray.controls[i].value.eval)

    //   })
  }




  onChangeCriterion() {
    // if (this.formCum.value.filialeId != '00000000-0000-0000-0000-000000000000' &&
    //   this.formCum.value.filLocalid != '00000000-0000-0000-0000-000000000000' &&
    //   this.formCum.value.date_notation != '') {
    this.CritereService.getGroupedCriterion().subscribe(
      res => {
        //  debugger
        this.listGroupedCriterions = res as groupedCriterionDTO[]
        if (this.listGroupedCriterions.length > 0) {
          this.listGroupedCriterions.forEach((group: any) => {
            if (group.criterionDTOs.length > 0) {
              this.buildFormNotation(group.criterionDTOs)
            }

          });
        }

      }
    )
    // }


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
    console.log('local ', this.users.id);
    this.controlArray.controls.forEach((form: any) => { form['controls'].date_notation.setValue(this.formCum.value.date_notation) });
    this.controlArray.controls.forEach((form: any) => { form['controls'].filLocalid.setValue(this.formCum.value.filLocalid) });
    this.controlArray.controls.forEach((form: any) => { form['controls'].userid.setValue(this.users.id) });

    this.controlArray.controls.forEach((element: any, i: Number) => {
      console.log('note', element.value.note);
      //  debugger
      if (element.value.id == "00000000-0000-0000-0000-000000000000") {
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
      else {
        this.noteService.updateNote(element.value).subscribe(
          res => {
            // for (let i = this.controlArray.length - 1; i >= 0; i--) {
            //   this.controlArray.removeAt(i)
            //   element.reset()
            // }
            //   alert("ok")
            this.controlArray.disable()
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Modification est effectuée avec succèes',
              showConfirmButton: false,
              timer: 1500
            })
          })
      }



    });
  }
}
