import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private fb: FormBuilder,public userService :UserService) { }
  exform!:FormGroup;
  filList: Array<{filialeId: string, filialName: string,image:string}> = [
    {filialeId: "1", filialName: "Mazraa",image:"assets/images/mazraa.jpg"},
    {filialeId: "2", filialName: 'Jadida ',image:"assets/images/download.jpg"},
    {filialeId: "3", filialName: ' Gan',image:"assets/images/alimentation-animale.png"},
    {filialeId: "4", filialName: "Med oil",image:"assets/images/alimentation-animale.png"},
    {filialeId: "5", filialName: "oasis",image:"assets/images/oasis.jpg"},
  ];

  filLou: Array<{nom : string}> = [
    {nom:"Ahmed"},
    {nom:"Mohamed"}
  ];


  ngOnInit(): void {
    console.log(this.filList)
    this.exform=this.fb.group({
      userId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      name: [null, Validators.required],
      mail: [null, Validators.required, Validators.email],
      filialeName: [null, Validators.required],
      LocName:[null, Validators.required],
    });
    
  }

  public saveData() {
    /*if (!this.formCum.valid) {
     // alert("veuillez remplir tous les champs")
    }*/
    if (this.exform.controls['userId'].value == '00000000-0000-0000-0000-000000000000') {
      console.log("post")
      console.log(this.exform.value);
      this.userService.PostUser(this.exform).subscribe(res => {
        alert(res.toString());
       // this.refreshfilList();
      })
    }

    else {
      console.log("put")
      console.log(this.exform.value);
      this.userService.updateUser(this.exform.value).subscribe(res => {
        alert(res.toString());
       // this.refreshfilList();
        //  this.cumulative={}
      })
    }
    console.log('hello');
    console.log(this.exform.value);
    // alert(this.cumulative.designation);
  }

}
