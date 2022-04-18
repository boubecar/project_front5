import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CritereService } from '../services/critere.service';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  
 // CritereList:any

 eval:string=''
 isShown: boolean = false ;
NormeList: Array<{NormeId: number, designation: string,path:string}> = [
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
];
  constructor(private router: Router ,private fb: FormBuilder,public CritereService: CritereService) { }
  

  
  ngOnInit(): void {
  }
  refreshcriList(e:any) {
    this.isShown = true;
    this.CritereService.getCritereByNorme(e.NormeId).subscribe(data => {
      //this.CritereList = data;
      console.log(this.CritereList)
    });
 

  }
  
  
}
