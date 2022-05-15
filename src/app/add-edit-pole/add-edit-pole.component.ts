import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Pole } from '../pole';
import { PoleServiceService } from '../services/pole-service.service';

@Component({
  selector: 'app-add-edit-pole',
  templateUrl: './add-edit-pole.component.html',
  styleUrls: ['./add-edit-pole.component.css']
})
export class AddEditPoleComponent implements OnInit {

  PoleList: any = []
  
  PhotoFileName: string = ""
  PhotoFilePath: string = 'assets/images/inconu.png'
  constructor(public service: PoleServiceService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.refreshPoleList();
  }
 
  
  public saveData() {

    if (!this.service.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    
    if (this.service.formCum.controls['poleId'].value == '00000000-0000-0000-0000-000000000000') {
      
      this.service.postPole(this.service.formCum.value).subscribe(res => {
        alert(res.toString());
       
      });
      this.ngOnInit();
    }
    else {
      console.log("put")
      console.log(this.service.formCum.value);
      this.service.updatePole(this.service.formCum.value).subscribe(res => {
        alert(res.toString());
        alert("refrech 1");
        this.refreshPoleList();
        alert("refrech 2");
      })
    }
    console.log('hello');
    console.log(this.service.formCum.value);
    //alert(this.service.formCum.value);
  }
  refreshPoleList() {
    this.service.getPoleList().subscribe(data => {
      this.PoleList = data;
    });
  }
  uploadPhoto(e: any) {
    /* var file = event.target.files[0];
     const formData: FormData = new FormData();
     formData.append('uploadedFile', file, file.name);
     alert(file.name)
     this.PhotoFilePath = this.service.formCum.controls['image'].value;
     this.service.UploadPhoto(formData).subscribe((data: any) => {
       this.PhotoFileName = data.toString();
       this.PhotoFilePath = this.service.formCum.controls['path'].value;
     })
     console.log("photo")
     console.log(this.PhotoFilePath)
     /*
     var file=e.target.files[0];
     const formData:FormData=new FormData();
     formData.append('uploadedFile',file,file.name);
     alert(file.name)
     this.PhotoFilePath=this.service.formCum.controls['image'].value;
     this.service.UploadPhoto(formData).subscribe((data:any)=>{
       this.PhotoFileName=data.toString();
       this.PhotoFilePath=this.service.formCum.controls['image'].value;
     })*/

    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (evant: any) => {
        this.PhotoFilePath = evant.target.result;
      }
    }
    console.log("photo")
    console.log(this.service.formCum.controls['image'].value)
  }
  

}
