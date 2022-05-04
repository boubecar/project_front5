import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Filiale } from '../filiale';
import { Norme } from '../norme';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';
import { NormeServiceService } from '../services/norme-service.service';
import {FormControl,FormArray } from '@angular/forms'   

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
// Form Array //
title = 'formarray';  
  orderForm!: FormGroup;  
  items!: FormArray;  
  constructor(private formBuilder: FormBuilder) {}   
  ngOnInit() {  
    this.orderForm = new FormGroup({  
      items: new FormArray([])  
    });  
  }   
  createItem(): FormGroup {  
    return this.formBuilder.group({  
      name: '',  
      description: '',  
      price: ''  
    });  
  }   
  addItem(): void {  
    this.items = this.orderForm.get('items') as FormArray;  
    this.items.push(this.createItem());  
  }  







// Form Array //
 /* isShown: boolean = false;
  selectedObject1: any;
  selectedObject: any;
  constructor(private router: Router, private fb: FormBuilder, public filialeService: FilialeService, public LocService: LocalService) {
  }
  designation:any 
  p: number=1;
  key:string='id'
  reverse:boolean=false 
  menberList: Array<{Id: string, designation: string,lastName:string,email:string,mobile:string,salary:string}> = [
    {Id: "1", designation: "Mohamed",lastName:"Mahwechi",email:"mahwechi@gmail.com",mobile:"2890405",salary:"8"},
    {Id: "2", designation: 'Saleh ',lastName:"Ghribi",email:"amir@gmail.com",mobile:"27604859",salary:"3"},
    {Id: "3", designation: ' Gasen',lastName:"Mrayhi",email:"sirin@yahoo.fr",mobile:"28607584",salary:"1"},
    {Id: "4", designation: "Ben Romdhane", lastName:"Mohamed",email:"benromdhanemohamed@gmail.com",mobile:"58209788",salary:"1200"},
    {Id: "5", designation: "Soujel", lastName:"Ahmed",email:"ahmedsoujel45@gmail.com",mobile:"97856201",salary:"800"},
  ]
  /* filList: Array<{filialeId: string, filialName: string,image:string}> = [
     {filialeId: "1", filialName: "Mazraa",image:"assets/images/mazraa.jpg"},
     {filialeId: "1", filialName: 'Jadida ',image:"assets/images/download.jpg"},
     {filialeId: "1", filialName: ' Gan',image:"assets/images/alimentation-animale.png"},
     {filialeId: "1", filialName: "Med oil",image:"assets/images/alimentation-animale.png"},
     {filialeId: "1", filialName: "oasis",image:"assets/images/oasis.jpg"},
 ];*/
  /*LocalList: Array<{filialeId: string, localdescription: string,image:string}> = [
   {filialeId: "1", localdescription: "Zahra",image:"assets/images/mazraa.jpg"},
   {filialeId: "1", localdescription: 'Mouroug ',image:"assets/images/download.jpg"},
   {filialeId: "1", localdescription: ' Rades',image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", localdescription: "Tunis",image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", localdescription: "wardia",image:"assets/images/oasis.jpg"},
 ];*/
 /* filList: any
  LocalList: any
  ngOnInit(): void {
    this.refreshfilList();
    //this.refreshcriList()
    this.menberList = [    {Id: "1", designation: "Mohamed",lastName:"Mahwechi",email:"mahwechi@gmail.com",mobile:"2890405",salary:"8"},
    {Id: "2", designation: 'Saleh ',lastName:"Ghribi",email:"amir@gmail.com",mobile:"27604859",salary:"3"},
    {Id: "3", designation: ' Gasen',lastName:"Mrayhi",email:"sirin@yahoo.fr",mobile:"28607584",salary:"1"},
    {Id: "4", designation: "Ben Romdhane", lastName:"Mohamed",email:"benromdhanemohamed@gmail.com",mobile:"58209788",salary:"1200"},
    {Id: "5", designation: "Soujel", lastName:"Ahmed",email:"ahmedsoujel45@gmail.com",mobile:"97856201",salary:"800"},
    ]
  }
  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
    });
  }
  refreshcriList(selectedObject: Filiale) {
    this.isShown = true;
    this.LocService.GetAllLocalByFilale(selectedObject.filialId).subscribe(data => {
      this.LocalList = data;

    });

    console.log("hello");
    console.log(this.selectedObject)
    console.log(this.LocalList)
    console.log('lll')
    console.log(this.selectedObject1)
  }
  PhotoFilePath:string=''
  
  Search(){
    if (this.designation==''){
      this.ngOnInit()
    }else{this.menberList = this.menberList.filter(res => {
      return res.designation.toLocaleLowerCase().match(this.designation.toLocaleLowerCase());
    })
    }
  }

  sort(key:any)
  {
    this.key=key;
    this.reverse=!this.reverse;
  }
  uploadPhoto(e: any) {
    /* var file = event.target.files[0];
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
     
    /* if (e.target.files)
     {
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload=(evant:any)=>{
         this.PhotoFilePath=evant.target.result;
       }
     }
     console.log("photo")
     //console.log(this.service.formCum.controls['image'].value)
   }
*/
}