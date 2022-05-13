import { Component, OnInit } from '@angular/core';

import { Norme } from 'src/app/norme';
import { NormeServiceService } from 'src/app/services/norme-service.service';
import { FormControl } from "@angular/forms";
@Component({
  selector: 'app-add-edit-norme',
  templateUrl: './add-edit-norme.component.html',
  styleUrls: ['./add-edit-norme.component.css']
})
export class AddEditNormeComponent implements OnInit {



  cumulative: Norme[] = new Array()
  NormeList: any = []
  constructor(public normeService: NormeServiceService) { }

  ngOnInit(): void {
    this.refreshnormList();

  }

  public saveData() {
    debugger
    if (!this.normeService.formCum.valid) {

      alert("veuillez remplir tous les champs")
    }

    if (this.normeService.formCum.controls['normeId'].value == '00000000-0000-0000-0000-000000000000') {
      this.normeService.postNorme(this.normeService.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshnormList()

      }
      )
      this.refreshnormList()
    }
    else {

      this.normeService.editNorme(this.normeService.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshnormList()
      })




    }


    // alert(this.cumulative.designation);
  }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
    });
  }
  // ChangeData(norme: Norme) {

  //   debugger
  //   this.formCum.reset({
  //     normeId: norme.normeId,
  //     designation: norme.designation,

  //   })
  // }


}
