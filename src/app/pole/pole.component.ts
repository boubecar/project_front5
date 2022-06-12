import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pole } from '../pole';
import { FilialeService } from '../services/filiale.service';
import { PoleServiceService } from '../services/pole-service.service';

@Component({
  selector: 'app-pole',
  templateUrl: './pole.component.html',
  styleUrls: ['./pole.component.css']
})
export class PoleComponent implements OnInit {
  filaleList: any;
  poleName: any
//  PoleList: any = []
  PhotoFileName: string = ""
  PhotoFilePath: string = 'assets/images/inconu.png'
/*filList: Array<{filialeId: string, filialName: string,image:string,poleName:string}> = [
    {filialeId: "1", filialName: "Mazraa",image:"assets/images/mazraa.jpg",poleName:"Alimentation-animale"},
    {filialeId: "1", filialName: 'Jadida ',image:"assets/images/download.jpg",poleName:"agroalimentaire"},
    {filialeId: "1", filialName: ' Gan',image:"assets/images/alimentation-animale.png",poleName:"industrielle"},
    {filialeId: "1", filialName: "Med oil",image:"assets/images/alimentation-animale.png",poleName:"industrielle"},
    {filialeId: "1", filialName: "oasis",image:"assets/images/oasis.jpg",poleName:"agroalimentaire"},
];*/
filList:any
  cumulative: Pole = {}

  ModalTitle: string = " Pole ";


  constructor(public filialeService: FilialeService,public service: PoleServiceService, private fb: FormBuilder, private router: Router) { }

 
  ngOnInit(): void {
    this.refreshPoleList();
  }
 /* public saveData() {

    if (!this.service.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    
    if (this.service.formCum.controls['poleId'].value == '00000000-0000-0000-0000-000000000000') {
      
      this.service.postPole(this.service.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshPoleList();
      });
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
  }*/
  DeleteClick(item: any) {
    /*
    if (confirm('Are you sure??')) {
      alert(item.poleId)
      this.service.deletePole(item.poleId).subscribe(data => {
        alert(data.toString());
        this.refreshPoleList();
      })
    }*/

    
    Swal.fire({
      title: 'Êtes vous sûrs?',
      text: "Voulez vous supprimer ce pole!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, Supprimez !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePole(item.poleId).subscribe(data => {
          //alert(data.toString());
        Swal.fire(
          'supprimé!',
          'Le pole est supprimé avec succès .',
          'success'
        )
        this.refreshPoleList();
        })
      }
    })
  }


  

  refreshPoleList() {
    this.service.getPoleList().subscribe(data => {
      this.service.PoleList = data;
      // this.DepartmentListWithoutFilter=data;
    });
  }
  uploadPhoto(e: any) {
    

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
  ChangeData(pole: Pole) {

    this.service.formCum.reset({
      poleId: pole.poleId,
      poleName: pole.poleName,
      image: pole.image
    });

  }

  detnorme(item: any) {
   //this.router.navigate(['/fl', item.poleId]);
   console.log("id pole",item.poleId)
    //this.isShown = true;
    this.filialeService.GetAllfilialeByPole(item.poleId).subscribe(data => {
      this.filialeService.detailPole = data;
      //console.log(this.filialeService)
    });
  }
  Search() {
    if (this.poleName == '') {
      this.refreshPoleList()
    } else {
      this.service.PoleList = this.service.PoleList.filter((res: { poleName: string; }) => {
        return res.poleName.toLocaleLowerCase().match(this.poleName.toLocaleLowerCase());
      })
    }
  }
}
