import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PoleServiceService } from 'src/app/services/pole-service.service';

@Component({
  selector: 'app-add-edit-pole',
  templateUrl: './add-edit-pole.component.html',
  styleUrls: ['./add-edit-pole.component.css']
})
export class AddEditPoleComponent implements OnInit {

  PoleList: any = []
  constructor(public service: PoleServiceService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
  }



  public saveData() {

    if (!this.service.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }

    if (this.service.formCum.controls['poleId'].value == '00000000-0000-0000-0000-000000000000') {
      this.service.postPole(this.service.formCum.value).subscribe(res => {
        this.service.formCum.reset()
      })
    }
    else {



      this.service.updatePole(this.service.formCum.value).subscribe(res => {

      })
    }

  }
  refreshPoleList() {
    this.service.getPoleList().subscribe(data => {
      this.PoleList = data;
      // this.DepartmentListWithoutFilter=data;
    });
  }


}
