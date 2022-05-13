import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  cumulative: Critere = {}
  CritereList: any = []
  idnorm: string = ''


  //filterForm: FormGroup
  //filterForm: FormGroup
  //filterForm: FormGroup
  //filterForm: FormGroup
  formCum!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, public CritereService: CritereService, private service: NormeServiceService, private fb: FormBuilder) {
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
      critereId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      criterelabel: [""],
      normeId: this.idnorm
    });

    console.log("id", this.idnorm)
  }
  ChangeData(norme: Critere) {

    this.formCum.reset({
      critereId: norme.critereId,
      criterelabel: norme.criterelabel,
      normeId: this.idnorm


    });
    this.refreshcriList();


  }


  public saveData() {
    
    if (!this.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }

    if (this.formCum.controls['critereId'].value == '00000000-0000-0000-0000-000000000000') {

      console.log("post")
      console.log(this.formCum.value);
      this.CritereService.postCritere(this.formCum.value).subscribe(data => {
        this.refreshcriList()
        alert(data.toString())

      })

    }
    else {
      console.log("put")
      console.log(this.formCum.value);
      this.CritereService.editCritere(this.formCum.value).subscribe(data => {
        alert(data.toString());
        this.refreshcriList();
      })
    }

    console.log('hello');
    this.refreshcriList();
    console.log(this.formCum.value);
    // alert(this.cumulative.designation);
  }


  deleteClick(item: any) {
    if (confirm('Etes vous sure??')) {
      alert(item.critereId)
      this.CritereService.deleteCritere(item.critereId).subscribe(data => {
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
    this.CritereService.getCritereByNorme(this.idnorm).subscribe(data => {
      this.CritereList = data;
      console.log('oui')
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
