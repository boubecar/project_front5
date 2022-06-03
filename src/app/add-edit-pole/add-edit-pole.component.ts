import { Component, OnInit, QueryList } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pole } from '../pole';
import { PoleServiceService } from '../services/pole-service.service';

@Component({
  selector: 'app-add-edit-pole',
  templateUrl: './add-edit-pole.component.html',
  styleUrls: ['./add-edit-pole.component.css']
})
export class AddEditPoleComponent implements OnInit {

  //PoleList: any = []
  image: any;

  PhotoFileName: string = ""
  PhotoFilePath: string = 'https://cdn3.sosav.fr/store/69879-large_default/plaque-metallique-de-protection-des-nappes-du-lcd-iphone-6.jpg'
  constructor(public service: PoleServiceService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.refreshPoleList();
  }

  refreshPoleList() {
    this.service.getPoleList().subscribe(data => {
      this.service.PoleList = data;

    });
  }
  uploadPhoto(e: any) {

    this.image = e?.target?.files[0];
    if (e.target.files) {

      var reader = new FileReader();

      reader.readAsDataURL(this.image);
      reader.onload = (evant: any) => {
        this.PhotoFilePath = evant.target.result;
      }

    }
  }
  tab: any

  public saveData() {
   // this.tab = ['poleName':this.service.formCum.value.poleName, this.image]
    /*if (!this.service.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }*/ const formData: FormData = new FormData();

    // formData.append('image', this.image);
    // formData.append('poleName', this.service.formCum.value.poleName);
    //this.service.formCum.controls['image'].setValue(this.image);
    console.log('gt', this.service.formCum.value)

    if (this.service.formCum.controls['poleId'].value == '00000000-0000-0000-0000-000000000000') {

      this.service.postPole(this.service.formCum.value, this.image).subscribe(res => {
        // alert(res.toString());

        if (res == "Added done") {
          // debugger

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'l\'ajout est effectuée avec succèes',
            showConfirmButton: false,
            timer: 1500
          })


        }

        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res,
            footer: '<a href="">Erreur de saisie ?</a>'
          })
          this.service.formCum.reset();
        }
        this.service.formCum.reset();
        this.refreshPoleList();
      });
    }
    else {
      console.log("put")
      console.log(this.service.formCum.value);
      this.service.updatePole(formData).subscribe(res => {
        // alert(res.toString());

        if (res == "Update Done") {
          // debugger

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'la modification  est effectuée avec succèes',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="/pole">Veuillez réessayer </a>'
          })
        }

        this.refreshPoleList();
      });

    }
    console.log('hello', formData);
    console.log(this.service.formCum.value);
    //alert(this.service.formCum.value);
  }






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



}
