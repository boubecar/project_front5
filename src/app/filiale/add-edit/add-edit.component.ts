import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilialeService } from 'src/app/services/filiale.service';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  formCum!: FormGroup;

  idnorm: String = '';
  constructor(public filialeService: FilialeService, public service: PoleServiceService, public filService: FilialeService, private route: ActivatedRoute, private fb: FormBuilder) {
    // this.route.params.subscribe((params: any) => console.log(params));
  }


  //PoleList :any
  refreshPoleList() {

    this.service.getPoleList().subscribe(data => {
      this.service.PoleList = data;
      console.log("pole", this.service.PoleList)
    });
  }
  ngOnInit(): void {

    this.refreshPoleList()
    //   this.refreshfilList();
    this.formCum = this.fb.group({
      filialId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      filialName: [''],
      poleId: ['00000000-0000-0000-0000-000000000000'],
    });
  }
  d: any
  public saveData() {


    if (this.filialeService.formCum.controls['filialId'].value == '00000000-0000-0000-0000-000000000000') {
      //  console.log("post")
      // console.log(this.formCum.value);

      this.filService.postFiliale(this.filialeService.formCum.value).subscribe(res => {
        //alert(res.toString());
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
            footer: '<a href="/filiale">Erreur de saisie ?</a>'
          })
        }

        this.refreshPoleList();
      });
    }
    else {
      console.log("put")
      console.log(this.filialeService.formCum.value);
      this.filService.updateFiliale(this.filialeService.formCum.value).subscribe(res => {
        alert(res.toString());
        console.log("c?")
        this.d = res
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
            text: 'ee',
            footer: '<a href="/filiale">Veuillez réessayer </a>'
          })
        }

        //  this.cumulative={}
      })


    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'update done',
      showConfirmButton: false,
      timer: 1500
    })
    // alert(this.cumulative.designation);
  }
  refreshfilList() {
    this.filService.getFilialeList().subscribe(data => {
      this.filService.filList = data as [];
      console.log("refrechlist", this.filService.filList)
    });
  }
}
