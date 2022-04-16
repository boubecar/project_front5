import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Norme } from '../norme';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  formCum = this.fb.group({
    note: [''],
    comment: [''],
  });
  constructor(private router: Router, private fb: FormBuilder) { }
  /*public counts = ["Recieved","In Progress","Ready for Billing",
  "Billed","Order Closed"];
  public orderStatus = "In Progress"*/
  filList: Array<{filialeId: string, filialeName: string,image:string}> = [
    {filialeId: "1", filialeName: "Mazraa",image:"assets/images/mazraa.jpg"},
    {filialeId: "1", filialeName: 'Jadida ',image:"assets/images/download.jpg"},
    {filialeId: "1", filialeName: ' Gan',image:"assets/images/alimentation-animale.png"},
    {filialeId: "1", filialeName: "Med oil",image:"assets/images/alimentation-animale.png"},
    {filialeId: "1", filialeName: "oasis",image:"assets/images/oasis.jpg"},
];
LocalList: Array<{filialeId: string, LocalName: string,image:string}> = [
  {filialeId: "1", LocalName: "Zahra",image:"assets/images/mazraa.jpg"},
  {filialeId: "1", LocalName: 'Mouroug ',image:"assets/images/download.jpg"},
  {filialeId: "1", LocalName: ' Rades',image:"assets/images/alimentation-animale.png"},
  {filialeId: "1", LocalName: "Tunis",image:"assets/images/alimentation-animale.png"},
  {filialeId: "1", LocalName: "wardia",image:"assets/images/oasis.jpg"},
];
  ngOnInit(): void {
  }
  isShown: boolean = false ;
  
  refreshcriList() {
    this.isShown = true;
   // this.CritereService.getCritereByNorme(e.NormeId).subscribe(data => {
      //this.CritereList = data;
     // console.log(this.CritereList)
    //});
  }
}