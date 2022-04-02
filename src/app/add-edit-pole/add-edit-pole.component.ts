import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Pole } from '../pole';
import { PoleServiceService } from '../services/pole-service.service';

@Component({
  selector: 'app-add-edit-pole',
  templateUrl: './add-edit-pole.component.html',
  styleUrls: ['./add-edit-pole.component.css']
})
export class AddEditPoleComponent implements OnInit {

 // constructor() { }
   constructor(public service:PoleServiceService,private fb: FormBuilder) { }
 /* pole:any;
  PoleId:string="";
  PoleName:string="";*/
  PhotoFileName:string="";
  PhotoFilePath:string="";

  formCum=this.fb.group({
    designation:[""],
    image:[""],
    });

    cumulative: Pole = {}
  ngOnInit(): void {
   // this.PoleId=this.pole.PoleId;
    //this.PoleName=this.pole.PoleName;
  }
  addPole(){
    if(! this.formCum.valid){
      alert("veuillez remplir tous les champs")
    }
    
    this.cumulative = {
      poleId:this.cumulative.poleId,
      poleName: this.formCum.controls['designation'].value,
      image:this.formCum.controls['PhotoFilePath'].value
    }
    this.service.postPole(this.cumulative).subscribe(res=>{
      alert(res.toString());
    })
  
  
    console.log('hello');
  } 

  updatePole(){
   /* var val = {DepartmentId:this.PoleId,
      DepartmentName:this.PoleName};
      /*this.service.updatePole(val).subscribe(res=>{
        alert(res.toString());
        });*/
  }
  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    /*this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })*/
  }
}
