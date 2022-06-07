import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  //CritereList: any = []
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
      criterelabel: ["",Validators.required],
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
      this.CritereService.postCritere(this.formCum.value).subscribe(res => {
        if (res == "Added done") {
          // debugger
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'l\'ajout est effectuée avec succèes',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Il ya  une  erreur quelque part !',
            footer: '<a href="/gnorme">réesseer ?</a>'

          })
        }

      })
      this.refreshcriList()


    }
    else {
      console.log("put")
      console.log(this.formCum.value);
      this.CritereService.editCritere(this.formCum.value).subscribe(data => {
        //alert(data.toString());
        if (data == "Update Done")
      {
        // debugger
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'la modification  est effectuée avec succèes',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else 
      {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="/pole">Veuillez réessayer </a>'
      })
      }

        this.refreshcriList();
      })
    }

    console.log('hello');
    this.refreshcriList();
    console.log(this.formCum.value);
    // alert(this.cumulative.designation);
  }


  deleteClick(item: any) {
    Swal.fire({
      title: 'Êtes vous sûrs?',
      text: "Voulez vous supprimer ce pole!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, Supprimez !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CritereService.deleteCritere(item.critereId).subscribe(data => {
          //alert(data.toString());
        Swal.fire(
          'supprimé!',
          'Le pole est supprimé avec succès .',
          'success'
        )
        this.refreshcriList();
        })
      }
    })
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
      this.CritereService.CritereList = data;
      console.log('oui')
      // console.log(this.CritereList)
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
