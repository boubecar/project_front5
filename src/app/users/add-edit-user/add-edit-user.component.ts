import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { ResponseModel } from 'src/app/Models/responseModel';
import { Role } from 'src/app/Models/role';
import { FilialeService } from 'src/app/services/filiale.service';
import { UserService } from 'src/app/services/user.service';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  public roles: Role[] = [];
  registerForm!: FormGroup;
  constructor(private router: Router, private filialeService: FilialeService, private formBuilder: FormBuilder, private userServie: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshfilList()
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      filalelId: ['', Validators.required]
    });
    this.getAllRoles();
  }
  onSubmit() {
    //   this.toastr["success"]("test message", "test")

    console.log('onsu', this.registerForm)
    let fullName = this.registerForm.controls["fullName"].value;
    let email = this.registerForm.controls["email"].value;
    let password = this.registerForm.controls["password"].value;
    let filalelId = this.registerForm.controls["filalelId"].value;

    this.userServie.register(fullName, email, password, filalelId, this.roles.filter(x => x.isSelected).map(x => x.role)).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.registerForm.controls["fullName"].setValue("");
        this.registerForm.controls["email"].setValue("");
        this.registerForm.controls["password"].setValue("");
        this.registerForm.controls["filalelId"].setValue("");

        this.roles.forEach(x => x.isSelected = false);
        ////this.toastr.info("You have created account please login");
        this.router.navigate(["login"]);

      } else {
        //  this.toastr.info(data.dateSet[0]);
      }
      console.log("response", data);
    }, error => {
      console.log("error", error)
      // this.toastr.info("Something went wrong please try again later");
    })
  }
  getAllRoles() {
    this.userServie.getAllRole().subscribe(roles => {
      this.roles = roles;
    });
  }
  onRoleChange(role: string) {
    this.roles.forEach(x => {
      if (x.role == role) {
        x.isSelected = !x.isSelected;
      }

    })
  }

  get isRoleSelected() {
    return this.roles.filter(x => x.isSelected).length > 0;
  }
  filList: any;
  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      console.log('hay')
      console.log('fil;', this.filList)
    });


  }
}
/*

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
    } 
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

*/
