import { Component, OnInit } from '@angular/core';

import { Norme } from 'src/app/norme';
import { NormeServiceService } from 'src/app/services/norme-service.service';
import { FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-edit-norme',
  templateUrl: './add-edit-norme.component.html',
  styleUrls: ['./add-edit-norme.component.css']
})
export class AddEditNormeComponent implements OnInit {

  cumulative: Norme[] = new Array()
  constructor(public normeService: NormeServiceService) { }

  ngOnInit(): void {

  }

  public saveData() {

    if (!this.normeService.formCum.valid) {

      alert("veuillez remplir tous les champs")
    }

    if (this.normeService.formCum.controls['normeId'].value == '00000000-0000-0000-0000-000000000000') {
      this.normeService.postNorme(this.normeService.formCum.value).subscribe(res => {
        // alert(res.toString())
        if (res == "Added done") {
          // debugger
          this.normeService.formCum.reset();
          //  this.closebutton.nativeElement.click();
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
            footer: '<a href="">Erreur de saisie ?</a>'
          })
        }
        this.refreshnormList()
      });

    }
    else {

      this.normeService.editNorme(this.normeService.formCum.value).subscribe(res => {
        this.normeService.formCum.disable()
        if (res == "Update Done") {
          // debugger

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'la modification est effectuée avec succèes',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="/gnorme">Veuillez réessayer </a>'
          })
        }

        this.refreshnormList()
      });

    }
  }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.normeService.NormeList = data;
    });
  }
}
