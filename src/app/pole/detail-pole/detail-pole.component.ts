import { Component, OnInit } from '@angular/core';
import { FilialeService } from 'src/app/services/filiale.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-detail-pole',
  templateUrl: './detail-pole.component.html',
  styleUrls: ['./detail-pole.component.css']
})
export class DetailPoleComponent implements OnInit {
  filList: Array<{filialeId: string, filialName: string,image:string,poleName:string}> = [
    {filialeId: "1", filialName: "Mazraa",image:"assets/images/mazraa.jpg",poleName:"Alimentation-animale"},
    {filialeId: "1", filialName: 'Jadida ',image:"assets/images/download.jpg",poleName:"agroalimentaire"},
    {filialeId: "1", filialName: ' Gan',image:"assets/images/alimentation-animale.png",poleName:"industrielle"},
    {filialeId: "1", filialName: "Med oil",image:"assets/images/alimentation-animale.png",poleName:"industrielle"},
    {filialeId: "1", filialName: "oasis",image:"assets/images/oasis.jpg",poleName:"agroalimentaire"},
];
//filList:any
constructor(public filialeService: FilialeService,public localService:LocalService) {
  
}

  ngOnInit(): void {
  }

  
  refreshfilList(id:any) {

    console.log(this.filialeService)
    //this.isShown = true;
    this.filialeService.GetAllfilialeByPole(id).subscribe(data => {
      //sthis.filList = data;
      console.log(this.filialeService)
    });

  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      
      this.filialeService.deleteFiliale(item.filialId).subscribe(data => {
        alert(data.toString());
        //this.refreshfilList();
      })
    }
  }
}
