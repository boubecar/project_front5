import { Component, OnInit } from '@angular/core';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
 //NormeList: any = []
  NormeList: Array<{NormeId: number, designation: string,path:string}> = [
    {NormeId: 1, designation: "Nettoyer",path: 'fa-paint-brush'},
    {NormeId: 2, designation: 'Ranger',path: 'fa-cubes'},
    {NormeId: 3, designation: 'Etre rigoureux',path: 'fa-balance-scale'},
    {NormeId: 4, designation: "Maintenir l'ordre",path: "fa-cubes"},
    {NormeId: 5, designation: "Débarrasser",path: 'fa-trash'},
]

 
  constructor(public normeService: NormeServiceService) { }

  ngOnInit(): void {
  }


  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      //this.NormeList = data;
    });
  }

}
