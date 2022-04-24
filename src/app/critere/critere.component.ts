import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Critere } from '../critere';
import { CritereService } from '../services/critere.service';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrls: ['./critere.component.css']
})
export class CritereComponent implements OnInit {
   CritereList: Array<{ critereId: number, criterelabel: string, normes: string }> = [
     { critereId: 1, criterelabel: "Nettoyer", normes: "" },
     { critereId: 2, criterelabel: 'Degré d’engagement de la direction et d’implication du personnel pour les 5S.', normes: "" },
     { critereId: 3, criterelabel: 'Etre rigoureux', normes: "" },
     { critereId: 4, criterelabel: "Maintenir l'ordre", normes: "" },
     { critereId: 5, criterelabel: "Débarrasser", normes: "" },
   ];
 /*
  NormeList: Array<{ NormeId: number, designation: string }> = [
    { NormeId: 1, designation: "Nettoyer" },
    { NormeId: 2, designation: 'Ranger' },
    { NormeId: 3, designation: 'Etre rigoureux' },
    { NormeId: 4, designation: "Maintenir l'ordre" },
    { NormeId: 5, designation: "Débarrasser" },
  ];
  */
  NormeList: any = []
  idnorm:string=''
  cumulative: Critere = {}
  //CritereList: any = []
  //filterForm: FormGroup
  //formCum: FormGroup
  constructor(private route: ActivatedRoute,private router: Router,public CritereService: CritereService, private service: NormeServiceService, private fb: FormBuilder) 
  {
    this.route.params.subscribe( params => console.log(params) );
    
   }

  //public norme: Norme = new Norme();
  ngOnInit(): void {
    this.refreshcriList()
    this.refreshDepList();
    this.route.params.subscribe(params => {
      this.idnorm = params['id']; 


   });

   console.log("id",this.idnorm)
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
     // this.CritereList = data;
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
