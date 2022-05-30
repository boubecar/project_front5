
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @BlockUI('main-loader') blockUI!: NgBlockUI;
  //public blockUiTemplateComponent = BlockUiTemplateComponent;
  public loaderMessage: string = "loading test";

  constructor(private router: Router) {

    if (this.isUserlogin) {
      // this.router.navigate(["/home"]);
    }

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onLogout() {
    localStorage.removeItem(Constants.USER_KEY);

  }
  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY) || '{}';
    return user && user.length > 0;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}') as User;
  }

  get isAdmin(): boolean {
    return this.user.roles.indexOf('Admin') > -1;
  }
  get isUser(): boolean {
    return this.user.roles.indexOf('User') > -1 && !this.isAdmin;
  }
}
