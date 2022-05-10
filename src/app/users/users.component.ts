import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  menberList: Array<{UserId: string, userName: string,lastName:string,email:string,mobile:string,Filile:string,Filoc:string}> = [
    {UserId: "1", userName: "Mohamed",lastName:"Mahwechi",email:"mahwechi@gmail.com",mobile:"2890405",Filile:"8",Filoc:""},
    {UserId: "2", userName: 'Saleh ',lastName:"Ghribi",email:"amir@gmail.com",mobile:"27604859",Filile:"3",Filoc :""},
    {UserId: "3", userName: ' Gasen',lastName:"Mrayhi",email:"sirin@yahoo.fr",mobile:"28607584",Filile:"1" ,Filoc:""},
    {UserId: "4", userName: "Ben Romdhane", lastName:"Mohamed",email:"benromdhanemohamed@gmail.com",mobile:"58209788",Filile:"1200",Filoc:""},
    {UserId: "5", userName: "Soujel", lastName:"Ahmed",email:"ahmedsoujel45@gmail.com",mobile:"97856201",Filile:"800",Filoc:""},
  ]
  constructor(private fb: FormBuilder,public userService :UserService) { }
  exform!:FormGroup;

  ngOnInit(): void {
    this.exform=this.fb.group({
      userId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      name: [null, Validators.required],
      mail: [null, Validators.required, Validators.email],
      filialeName: [null, Validators.required],
      LocName:[null, Validators.required],
    });
  }
  ChangeData(user:any) {

    this.exform.reset({
      userId: user.userId,
      name: user.userName,
      mail: user.email,
      filialeName:user.filialeName,
      LocName:user.LocName
    });
    //this.refreshfilList();

  }
  refreshfilList() {
    //this.isShown = true;
    /*this.filialeService.GetAllfilialeByPole(this.idnorm).subscribe(data => {
      //this.filList = data;
      console.log(this.filialeService)
    });*/

  }
}
