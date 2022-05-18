import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lister-users',
  templateUrl: './lister-users.component.html',
  styleUrls: ['./lister-users.component.css']
})
export class ListerUsersComponent implements OnInit {

  userList :any
  exform!:FormGroup;


  constructor(private fb: FormBuilder,public userService :UserService ,public service: PoleServiceService) { }
  
  ngOnInit(): void {
    this.refreshMemberList()
  }
  refreshMemberList() {
    this.userService.getUserList().subscribe(data => {
      this.userList = data;
      console.log(this.userList)
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

  this.exform.reset({
    userId: user.userId,
    name: user.userName,
    mail: user.email,
    filialeName:user.filialeName,
    LocName:user.LocName
  });

}
}