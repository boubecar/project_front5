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

 
  filList: any = []

  cumulative: Local = {}
  CritereList: any = []
  idnorm: string = ''


  formCum!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, public localService: LocalService, public filialeService: FilialeService, private fb: FormBuilder) {
    this.route.params.subscribe(params => console.log(params));

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idnorm = params['id'];

    })
    this.refreshfilList();
    this.refreshfilList();
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
    this.localService.getLocalList().subscribe(data => {
      this.CritereList = data;
      console.log('local', this.CritereList.value)
    });

    console.log('oui')
  }

  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      console.log('hay')
      console.log('fil;', this.filList)
    });


  }



}
