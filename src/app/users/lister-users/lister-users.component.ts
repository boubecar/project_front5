import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from 'src/app/Models/user';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import { UserService } from 'src/app/services/user.service';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-lister-users',
  templateUrl: './lister-users.component.html',
  styleUrls: ['./lister-users.component.css']
})
export class ListerUsersComponent implements OnInit {
  @BlockUI('user-loader') blockUI!: NgBlockUI;
  //public blockUiTemplateComponent = BlockUiTemplateComponent;
  public loaderMessage: string = "loading test";
  public userList: User[] = [];
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.blockUI.start();
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.userList = data;
      this.blockUI.stop();
    }, () => {
      this.blockUI.stop();
    })
  }

}
/*
  exform!:FormGroup;
  menberList: Array<{userId: string, userName: string,lastName:string,email:string,mobile:string,Filile:string,Filoc:string}> = [
    {userId: "1", userName: "Mohamed",lastName:"Mahwechi",email:"mahwechi@gmail.com",mobile:"2890405",Filile:"8",Filoc:""},
    {userId: "2", userName: 'Saleh ',lastName:"Ghribi",email:"amir@gmail.com",mobile:"27604859",Filile:"3",Filoc :""},
    {userId: "3", userName: ' Gasen',lastName:"Mrayhi",email:"sirin@yahoo.fr",mobile:"28607584",Filile:"1" ,Filoc:""},
    {userId: "4", userName: "Ben Romdhane", lastName:"Mohamed",email:"benromdhanemohamed@gmail.com",mobile:"58209788",Filile:"1200",Filoc:""},
    {userId: "5", userName: "Soujel", lastName:"Ahmed",email:"ahmedsoujel45@gmail.com",mobile:"97856201",Filile:"800",Filoc:""},
  ]

  constructor(private fb: FormBuilder,public userService :UserService ,public service: PoleServiceService) { }
  
  ngOnInit(): void {
    this.refreshMemberList()
  }
  refreshMemberList() {
    this.userService.getUserList().subscribe(data => {
      this.userService.userList = data;
      console.log(this.userService.userList)
    });
}

deleteClick(item: any) {
  alert(item.value);
  if (confirm('Are you sure??')) {
    
    this.userService.deleteUser(item.userId).subscribe(data => {
      alert(data.toString());
      this.refreshMemberList();
    })
  }
}

ChangeData(user:any) {
console.log("change ",user)
  this.exform.reset({
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    userRole:user.userRole,
    userimage:user.userimage,
    userpassword:user.userpassword,
   // filialId:user.filialId
  });
}
}*/