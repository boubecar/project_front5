import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Pole } from '../pole';
import { PoleServiceService } from '../services/pole-service.service';

@Component({
  selector: 'app-pole',
  templateUrl: './pole.component.html',
  styleUrls: ['./pole.component.css']
})
export class PoleComponent implements OnInit {
  //constructor() { }
  constructor(public service: PoleServiceService, private fb: FormBuilder) { }

  // constructor(private service:PoleServiceService) { }
  /*PoleList:Array<{PoleId: number, PoleName: string,image :string}> = [
    {PoleId: 1, PoleName: "alimentation-animale",image:"assets/images/alimentation-animale.png"},
    {PoleId: 2, PoleName: 'agroalimentaire',image:"assets/images/agrico.png"},
    {PoleId: 3, PoleName: 'avicole',image:"assets/images/avicole.jpg"},
    {PoleId: 4, PoleName: "industrielle",image:"assets/images/industrielle.png"},
];*/
  PoleList: any = []
  PhotoFileName: string = ""
  PhotoFilePath: string = 'assets/images/industrielle.png'


  cumulative: Pole = {}

  ModalTitle: string = " Pole ";

  ngOnInit(): void {
    this.refreshPoleList();
  }

  DeleteClick(item: any) {
    if (confirm('Are you sure??')) {
      alert(item.poleId)
      this.service.deletePole(item.poleId).subscribe(data => {
        alert(data.toString());
        this.refreshPoleList();
      })
    }
  }
  updatePole() {
    /* var val = {
       poleId: this.poleId,
       poleName: this.poleName,
       image: this.image
 
     };
     this.service.updatePole(val).subscribe(res => {
       alert(res.toString());
     });*/
  }
  /*ChangeData() {
    this.cumulative = {
      poleId: this.cumulative.poleId,
      poleName: this.formCum.controls['poleName'].value,
      image: this.formCum.controls['path'].value
    }
    this.service.updatePole(this.cumulative).subscribe(res => {
      alert(res.toString())
      this.cumulative = {}
    })
    console.log('hello');
    console.log(this.cumulative);
    alert(this.cumulative.poleName);
  }
*/

  public saveData() {
    if (!this.service.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    /*this.cumulative = {
      poleId: this.cumulative.poleId,
      poleName: this.service.formCum.controls['poleName'].value,
      image: this.service.formCum.controls['path'].value
    }*/
    this.service.postPole(this.service.formCum.value).subscribe(res => {
      alert(res.toString())
      this.cumulative = {}
    })


    console.log('hello');
    console.log(this.service.formCum.value);
    alert(this.service.formCum.value);
  }


  refreshPoleList() {
    this.service.getPoleList().subscribe(data => {
      this.PoleList = data;
      // this.DepartmentListWithoutFilter=data;
    });
  }
  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    alert(file.name)
    this.PhotoFilePath = this.service.formCum.controls['path'].value;
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.formCum.controls['path'].value;
    })
    console.log("photo")
    console.log(this.PhotoFilePath)
  }

}
