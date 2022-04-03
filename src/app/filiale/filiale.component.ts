import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filiale',
  templateUrl: './filiale.component.html',
  styleUrls: ['./filiale.component.css']
})
export class FilialeComponent implements OnInit {
  filList: Array<{filialeId: number, filialeName: string,image:string}> = [
    {filialeId: 1, filialeName: "Mazraa",image:"assets/images/mazraa.jpg"},
    {filialeId: 2, filialeName: 'Jadida ',image:"assets/images/download.jpg"},
    {filialeId: 3, filialeName: ' Gan',image:"assets/images/alimentation-animale.png"},
    {filialeId: 4, filialeName: "Med oil",image:"assets/images/alimentation-animale.png"},
    {filialeId: 5, filialeName: "oasis",image:"assets/images/oasis.jpg"},
];
  constructor() { }

  ngOnInit(): void {
  } 

}
