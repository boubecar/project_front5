import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { FilialeService } from 'src/app/services/filiale.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {


  constructor(private fi: FilialeService) { }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}') as User;
  }

  fila: any
  refreshcriList() {
    this.fi.getfiliale(this.user.filalelId).subscribe(data => {
      this.fila = data;
      console.log('oui')
      console.log(this.fila)
    });
  }
  // user: any
  ngOnInit(): void {
    //this.user = localStorage.getItem(Constants.USER_KEY) || '{}';
    // console.log('ff', this.user.fullName)
    // this.refreshcriList(this.user.value.filalelId)
    this.refreshcriList()

  }

}

