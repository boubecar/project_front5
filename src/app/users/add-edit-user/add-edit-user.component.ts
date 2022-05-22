import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilialeService } from 'src/app/services/filiale.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private fb: FormBuilder,public userService :UserService,public filialeService: FilialeService) { }
  exform!:FormGroup;



  ngOnInit(): void {
    this.exform=this.fb.group({
      userId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      userName: ['', Validators.required],
      userRole:["responsable 5S"],
      email: ['', Validators.required, Validators.email],
      userimage: ["assets/images/layout_img/msg2.png"],
      userpassword:['', Validators.required],
      filialId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    });
   this.refreshfilList();
    
  }

  public saveData() {
    /*if (!this.formCum.valid) {
     // alert("veuillez remplir tous les champs")
    }*/
    if (this.exform.controls['userId'].value == '00000000-0000-0000-0000-000000000000') {
      console.log("post")
      console.log(this.exform.value);
      this.userService.PostUser(this.exform.value).subscribe(res => {
        alert(res.toString());
        this.refreshMemberList();
      })
    }

    else {
      console.log("put")
      console.log(this.exform.value);
      this.userService.updateUser(this.exform.value).subscribe(res => {
        alert(res.toString());
        this.refreshMemberList();
      })
    }
    console.log('hello');
    console.log(this.exform.value);
  }

  
  refreshMemberList() {
    this.userService.getUserList().subscribe(data => {
      this.userService.userList = data;
      console.log(this.userService.userList)
    });
}


  refreshfilList() {
     this.filialeService.getFilialeList().subscribe(data => {
       this.filialeService.filList = data;
       console.log(this.filialeService)
     });
 
   }

}
