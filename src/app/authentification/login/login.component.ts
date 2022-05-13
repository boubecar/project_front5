import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLog!: FormGroup;
  constructor(private fb: FormBuilder,private route: Router) { }

  ngOnInit(): void {
    this.formLog = this.fb.group({
      matricule: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  LogOn (){
    console.log(this.formLog.value)
    if ((this.formLog.controls['matricule'].value == '123456') && (this.formLog.controls['password'].value=='admin'))
    {
      this.route.navigate(['']);

    }else 
    {
      this.route.navigate(['/login']);
    }

  }

}
