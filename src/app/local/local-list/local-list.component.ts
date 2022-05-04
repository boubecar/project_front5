import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})
export class LocalListComponent implements OnInit {
  
  LocList: Array<{ LocallId: string, localdescription: string ,Somme: number }> = [
    { LocallId: "1", localdescription: "Zahra",Somme :23},
    { LocallId: "3", localdescription: 'Ben Arous',Somme :15},
    { LocallId: "3", localdescription: 'Megrin',Somme :3},
    { LocallId: "4", localdescription: "Tunis",Somme: 5},
    { LocallId: "5", localdescription: "Rades" ,Somme:4},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
