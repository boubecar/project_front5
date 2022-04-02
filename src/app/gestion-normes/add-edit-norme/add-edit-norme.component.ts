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
    if (!this.normeService.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    // this.cumulative = {
    //   normeId:this.cumulative.normeId,
    //   designation: this.formCum.controls['designation'].value,
    // }
    if (this.normeService.formCum.controls['normeId'].value == '00000000-0000-0000-0000-000000000000') {

      console.log("post")
      console.log(this.normeService.formCum.value);
      this.normeService.postNorme(this.normeService.formCum.value).subscribe(res => {
        alert(res.toString());
        //  this.cumulative={}

        this.refreshnormList();
      })
    }
    else {
      console.log("put")
      console.log(this.normeService.formCum.value);
      this.normeService.editNorme(this.normeService.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshnormList();
        //  this.cumulative={}
      })


    }

    console.log('hello');
    console.log(this.normeService.formCum.value);
    // alert(this.cumulative.designation);
  }
  // ChangeData(norme: Norme) {

  //   debugger
  //   this.formCum.reset({
  //     normeId: norme.normeId,
  //     designation: norme.designation,

  //   })
  // }

  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
    });
  }
}
