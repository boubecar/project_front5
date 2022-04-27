import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from '../local';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-fil-local',
  templateUrl: './fil-local.component.html',
  styleUrls: ['./fil-local.component.css']
})
export class FilLocalComponent implements OnInit {

  /* CritereList: Array<{ critereId: number, criterelabel: string, normes: string }> = [
      { critereId: 1, criterelabel: "Nettoyer", normes: "" },
      { critereId: 2, criterelabel: 'Degré d’engagement de la direction et d’implication du personnel pour les 5S.', normes: "" },
      { critereId: 3, criterelabel: 'Etre rigoureux', normes: "" },
      { critereId: 4, criterelabel: "Maintenir l'ordre", normes: "" },
      { critereId: 5, criterelabel: "Débarrasser", normes: "" },
    ];
  
   NormeList: Array<{ NormeId: number, designation: string }> = [
     { NormeId: 1, designation: "Nettoyer" },
     { NormeId: 2, designation: 'Ranger' },
     { NormeId: 3, designation: 'Etre rigoureux' },
     { NormeId: 4, designation: "Maintenir l'ordre" },
     { NormeId: 5, designation: "Débarrasser" },
   ];
   */
  NormeList: any = []

  cumulative: Local = {}
  CritereList: any = []
  idnorm: string = ''


  //filterForm: FormGroup
  //filterForm: FormGroup
  //filterForm: FormGroup
  //filterForm: FormGroup
  formCum!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, public localService: LocalService, public filialeService: FilialeService, private fb: FormBuilder) {
    this.route.params.subscribe(params => console.log(params));

  }

  //public norme: Norme = new Norme();
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idnorm = params['id'];

    })
    //this.refreshcriList();
    this.refreshDepList();
    this.refreshcriList();
    this.formCum = this.fb.group({
      LocallId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      localdescription: [""],
      Filialeid: this.idnorm
    });

    console.log("id", this.idnorm)
  }
  ChangeData(local: Local) {

    this.formCum.reset({
      LocallId: local.LocallId,
      localdescription: local.localdescription,
      Filialeid: this.idnorm


    });
    this.refreshcriList();

    debugger

  }
  /*
    public saveData() {
      if (!this.CritereService.formCum.valid) {
        alert("veuillez remplir tous les champs")
      }
  
  
      this.cumulative = {
        critereId: this.cumulative.critereId,
        criterelabel: this.CritereService.formCum.controls['criterelabel'].value,
        normeId: this.idnorm,
      }
      this.CritereService.postCritere(this.cumulative).subscribe(res => {
        alert(res.toString())
        this.cumulative = {}
      })
  
  
      console.log('hello');
      // console.log(this.CritereService.formCum.value);
      //console.log(this.cumulative.normes); console.log(this.cumulative.criterelabel);
  
  
    }*/

  public saveData() {
    if (!this.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    // this.cumulative = {
    //   normeId:this.cumulative.normeId,
    //   designation: this.formCum.controls['designation'].value,
    // }
    if (this.formCum.controls['LocallId'].value == '00000000-0000-0000-0000-000000000000') {

      console.log("post")
      console.log(this.formCum.value);
      this.localService.postLocal(this.formCum.value).subscribe(res => {
        alert(res.toString());
        //  this.cumulative={}

        // this.refreshnormList();
      })
    }
    else {
      console.log("put")
      console.log(this.formCum.value);
      this.localService.editLocal(this.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshcriList();
        //  this.cumulative={}
      })


    }

    console.log('hello');
    console.log(this.formCum.value);
    // alert(this.cumulative.designation);
  }


  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      alert(item.critereId)
      this.localService.deleteLocal(item.locallId).subscribe(data => {
        alert(data.toString());
        this.refreshcriList();
      })
    }
  }
  /* this.cumulative = {
    normeId:this.cumulative.normeId,
    designation: this.formCum.controls['designation'].value,
  }
  this.normeService.editNorme(this.cumulative).subscribe(res=>{
    alert(res.toString())
    this.cumulative={}
  })
 
 
  console.log('hello');
  console.log(this.cumulative);
  alert(this.cumulative.designation);*/


  refreshcriList() {
    this.localService.GetAllLocalByFilale(this.idnorm).subscribe(data => {
      this.CritereList = data;

    });

    console.log('oui')
    console.log('local', this.CritereList)
  }

  refreshDepList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.NormeList = data;
      console.log('hay')
      console.log('fil;', this.NormeList)
    });


  }



}
