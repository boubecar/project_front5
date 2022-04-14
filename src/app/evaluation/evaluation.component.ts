import { Component, OnInit } from '@angular/core';
import { CritereService } from '../services/critere.service';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
 NormeList: any = []
 CritereList: any = []
 /* NormeList: Array<{NormeId: number, designation: string,path:string}> = [
    {NormeId: 1, designation: "Nettoyer",path: 'fa-paint-brush'},
    {NormeId: 2, designation: 'Ranger',path: 'fa-cubes'},
    {NormeId: 3, designation: 'Etre rigoureux',path: 'fa-balance-scale'},
    {NormeId: 4, designation: "Maintenir l'ordre",path: "fa-cubes"},
    {NormeId: 5, designation: "Débarrasser",path: 'fa-trash'},
]

CritereList: Array<{ critereId: number, criterelabel: string, normes: string }> = [
  { critereId: 1, criterelabel: "Nettoyer", normes: "" },
  { critereId: 2, criterelabel: 'Ranger', normes: "" },
  { critereId: 3, criterelabel: 'Etre rigoureux', normes: "" },
  { critereId: 4, criterelabel: "Maintenir l'ordre", normes: "" },
  { critereId: 5, criterelabel: "Débarrasser", normes: "" },
];*/
  constructor(public normeService: NormeServiceService,public CritereService: CritereService) { }

  ngOnInit(): void {
  }

  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
    }); 
  }
  refreshcriList(e:any) {
    this.CritereService.getCritereByNorme(e.NormeId).subscribe(data => {
      this.CritereList = data;
      console.log(this.CritereList)
    });
 

  }
}
