import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  filLocList: any = []

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
      locallId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      localdescription: [""],
      filialeid: ['00000000-0000-0000-0000-000000000000']
    });

    // console.log("id", this.idnorm)
  }
  ChangeData(local: any) {

    this.formCum.reset({
      locallId: local.locallId,
      localdescription: local.localdescription,
      filialeid: local.filialeid


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
  ok: boolean = false
  public saisie(): boolean {
    console.log("fil", this.formCum.controls['Filialeid'].value)
    this.localService.GetAllLocalByFilale(this.formCum.controls['Filialeid'].value).subscribe(data => {
      this.filLocList = data;
      console.log('localiiiiii', this.filLocList)
      if (this.filLocList.find((e: any) => e.localdescription == this.formCum.controls['localdescription'].value))
        console.log("existe", true)
      return true
    });
    return false


    //ok= this.filLocList.includes(this.formCum.controls['localdescription']);

    //console.log(ok);
  }

  rep: any
  public saveData() {
    if (!this.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    // this.cumulative = {
    //   normeId:this.cumulative.normeId,
    //   designation: this.formCum.controls['designation'].value,
    // }
    if (this.formCum.controls['locallId'].value == '00000000-0000-0000-0000-000000000000') {
      debugger
      console.log("post")
      console.log(this.formCum.value);
      this.localService.postLocal(this.formCum.value).subscribe(res => {
        //alert(res.toString());
        //  this.cumulative={}
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
            text: res,
            footer: '<a href="/loc">Erreur de saisie ?</a>'
          })
        }

        this.refreshcriList();
      })
    }
    else {
      console.log("put")
      console.log(this.formCum.value);
      this.localService.editLocal(this.formCum.value).subscribe(res => {
        // alert(res.toString());
        if (res == "Updated done") {
          // debugger

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res,
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res,
            footer: '<a href="/filiale">Veuillez réessayer </a>'
          })
        }
        this.refreshcriList();
        //  this.cumulative={}
      })


    }

    console.log('hello');
    console.log(this.formCum.value);
    // alert(this.cumulative.designation);
  }


  deleteClick(item: any) {

    Swal.fire({
      title: 'Êtes vous sûrs?',
      text: "Voulez vous supprimer ce local !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, Supprimez !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.localService.deleteLocal(item.locallId).subscribe(data => {
          //alert(data.toString());
          Swal.fire(
            'supprimé!',
            'un local  est supprimé avec succès .',
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
    this.localService.getLocalList().subscribe(data => {
      this.CritereList = data;
      // console.log('local', this.CritereList.value)
    });

    //  console.log('oui')
  }

  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      console.log('hay')
      console.log('fil;', this.filList)
    });


  }



}
