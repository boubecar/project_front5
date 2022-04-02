import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Critere } from '../critere';
import { CritereService } from '../services/critere.service';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrls: ['./critere.component.css']
})
export class CritereComponent implements OnInit {
  /* CritereList: Array<{ CritereId: number, CritereName: string, norme: string }> = [
     { CritereId: 1, CritereName: "Nettoyer", norme: "" },
     { CritereId: 2, CritereName: 'Ranger', norme: "" },
     { CritereId: 3, CritereName: 'Etre rigoureux', norme: "" },
     { CritereId: 4, CritereName: "Maintenir l'ordre", norme: "" },
     { CritereId: 5, CritereName: "Débarrasser", norme: "" },
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
  
  cumulative: Critere = {}
  CritereList: any = []
  //filterForm: FormGroup
  //formCum: FormGroup
  constructor(public CritereService: CritereService, private service: NormeServiceService, private fb: FormBuilder) { }

  //public norme: Norme = new Norme();
  ngOnInit(): void {
    this.refreshcriList()
    this.refreshDepList();
  }


  public saveData() {
    if (!this.CritereService.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }

    this.cumulative = {
      critereId: this.cumulative.critereId,
      criterelabel: this.CritereService.formCum.controls['criterelabel'].value,
      normes: this.CritereService.formCum.controls['normes'].value,
    }
    this.CritereService.postCritere(this.cumulative).subscribe(res => {
      alert(res.toString())
      this.cumulative = {}
    })


    console.log('hello');
    // console.log(this.CritereService.formCum.value);
    console.log(this.cumulative.normes); console.log(this.cumulative.criterelabel);


  }


  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      alert(item.critereId)
      this.CritereService.deleteCritere(item.critereId).subscribe(data => {
        alert(data.toString());
        this.refreshcriList();
      })
    }
  }
  ChangeData() {
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
  }

  refreshcriList() {
    this.CritereService.getListCriteres().subscribe(data => {
      this.CritereList = data;
      console.log(this.CritereList)
    });


  }

  refreshDepList() {
    this.service.getListNormes().subscribe(data => {
      this.NormeList = data;
      console.log('hay')
      console.log(this.NormeList)
    });

  }

}
