import { NoopAnimationPlayer } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/Models/responseModel';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLog!: FormGroup;
  isshow: boolean = true;
  ishiden: boolean = false

  //    @BlockUI('main-loader')
  //   blockUI!: NgBlockUI;
  //   public loginForm = this.formBuilder.group({
  //     email: ['', [Validators.email, Validators.required]],
  //     password: ['', Validators.required]
  //   })
  //   constructor(private formBuilder: FormBuilder, private userServie: UserServices, private router: Router) { }

  //   ngOnInit(): void {
  //   }
  //   onSubmit() {
  //     console.log("on submit")
  //     // this.blockUI.start();
  //     let email = this.loginForm.controls["email"].value;
  //     let password = this.loginForm.controls["password"].value;
  //     this.userServie.login(email, password).subscribe((data: ResponseModel) => {

  //       if (data.responseCode == 1) {
  //         localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dateSet));
  //         let user = data.dateSet as User;
  //         this.router.navigate(['/login']);

  //       }
  //       // this.blockUI.stop();
  //       console.log("response", data);
  //     }, (error: any) => {
  //        this.blockUI.stop();
  //       console.log("error", error)
  //     })
  //   }

  // }
  constructor(private fb: FormBuilder, public userServie: UsersService, private route: Router) { }

  ngOnInit(): void {

  }
  @BlockUI('main-loader')
  blockUI!: NgBlockUI;
  public loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })
  onSubmit() {
    console.log("on submit")
    // this.blockUI.start();
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;
    this.userServie.login(email, password).subscribe((data: ResponseModel) => {

      if (data.responseCode == 1) {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dateSet));
        let user = data.dateSet as User;
        if (user.roles.join(',') == "Admin")
          this.route.navigate(['users']);
        else {
          this.route.navigate(['home']);
        }

      }
      // this.blockUI.stop();
      console.log("response", data);
    }, (error: any) => {
      this.blockUI.stop();
      console.log("error", error)
    })
  }



  show() {
    this.isshow = !this.isshow;
    this.ishiden = !this.ishiden;
  }

}

