
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
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

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartLabels: any[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

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
