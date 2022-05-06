import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css'],

})
export class ReclamationComponent implements OnInit {

  ReclamationList: Array<{ Id: string, userId: string, image: string,comment:string,noteDate:Date}> = [
    {Id:"1",userId:"1",image:"",comment:"vous avez oubliez de ramasser la poubele",noteDate:new Date()},
    {Id:"1",userId:"1",image:"",comment:"vous avez oubliez de ramasser la poubele",noteDate:new Date()},
    {Id:"1",userId:"1",image:"",comment:"vous navez pas débarrassés de vieux posters",noteDate:new Date()},
    {Id:"1",userId:"1",image:"",comment:"vous avez oubliez de ramasser la poubele",noteDate:new Date()},
    ];

    PlanDaction: Array<{ Id: string, userId: string,userName:string, image: string,plandescription:string,PlanDate:Date}> = [
      {Id:"1",userId:"1",userName:"Safwen Mejed",image:"",plandescription:"Ranger le bureau ",PlanDate:new Date()},
      {Id:"1",userId:"1",image:"",userName:"Lamjed Mohamed",plandescription:"débarrasser les vieux posters",PlanDate:new Date()},
      {Id:"1",userId:"1",image:"",userName:"Sofiem Drifi",plandescription:"vous avez oubliez de ramasser la poubele",PlanDate:new Date()},
      {Id:"1",userId:"1",userName:"Safwen Mejed",image:"",plandescription:"Ranger le bureau ",PlanDate:new Date()},
      {Id:"1",userId:"1",image:"",userName:"Lamjed Mohamed",plandescription:"débarrasser les vieux posters",PlanDate:new Date()},
      {Id:"1",userId:"1",image:"",userName:"Sofiem Drifi",plandescription:"vous avez oubliez de ramasser la poubele",PlanDate:new Date()},
      ];


  constructor() { }
  disabled = false;

  ngOnInit(): void {
  }
  //imen.daas@gmail.com

}
