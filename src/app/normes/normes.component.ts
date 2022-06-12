import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Norme } from '../norme';
import { PoleServiceService } from '../services/pole-service.service';

@Component({
  selector: 'app-normes',
  templateUrl: './normes.component.html',
  styleUrls: ['./normes.component.css']
})
export class NormesComponent implements OnInit {

  constructor() { }
  NormeList: Array<{ identifiant: number, libelle: string }> = [
    { identifiant: 1, libelle: "Nettoyer" },
    { identifiant: 2, libelle: 'Ranger' },
    { identifiant: 3, libelle: 'Etre rigoureux' },
    { identifiant: 4, libelle: "Maintenir l'ordre" },
    { identifiant: 5, libelle: "Débarrasser" },
  ];
  //constructor(private normeService: PoleServiceService ) { }

  //constructor(private service:SharedService) { }



  ModalTitle: string = "ajouter un nouveau norme";
  
  nor: any;
  NormId: string = "";
  NormeName: string = "";

  ngOnInit(): void {
    // this.NormId=this.nor.NormId;
    //this.NormeName=this.nor.NormeName;
  }

  addDepartment() {
    var val = {
      NormId: this.NormId,
      NormeName: this.NormeName
    };
    /* this.normeService.postCumulative(val).subscribe(res=>{
       alert(res.toString());
     });*/
  }









  /*addClick(){
    this.norme={
      poleId:0,
      poleName:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add pole";
    //this.ActivateAddEditPoleComp=true;

  }
  closeClick(){
   // this.ActivateAddEditPoleComp=false;
  }
  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    /*this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })*/
  //}
}
