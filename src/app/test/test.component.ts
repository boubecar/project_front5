import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Filiale } from '../filiale';
import { Norme } from '../norme';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  isShown: boolean = false;
  selectedObject1: any;
  selectedObject: any;
  constructor(private router: Router, private fb: FormBuilder, public filialeService: FilialeService, public LocService: LocalService) {
  }

  /* filList: Array<{filialeId: string, filialName: string,image:string}> = [
     {filialeId: "1", filialName: "Mazraa",image:"assets/images/mazraa.jpg"},
     {filialeId: "1", filialName: 'Jadida ',image:"assets/images/download.jpg"},
     {filialeId: "1", filialName: ' Gan',image:"assets/images/alimentation-animale.png"},
     {filialeId: "1", filialName: "Med oil",image:"assets/images/alimentation-animale.png"},
     {filialeId: "1", filialName: "oasis",image:"assets/images/oasis.jpg"},
 ];*/
  /*LocalList: Array<{filialeId: string, localdescription: string,image:string}> = [
   {filialeId: "1", localdescription: "Zahra",image:"assets/images/mazraa.jpg"},
   {filialeId: "1", localdescription: 'Mouroug ',image:"assets/images/download.jpg"},
   {filialeId: "1", localdescription: ' Rades',image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", localdescription: "Tunis",image:"assets/images/alimentation-animale.png"},
   {filialeId: "1", localdescription: "wardia",image:"assets/images/oasis.jpg"},
 ];*/
  filList: any
  LocalList: any
  ngOnInit(): void {
    this.refreshfilList();
    //this.refreshcriList()
  }
  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
    });
  }
  refreshcriList(selectedObject: Filiale) {
    this.isShown = true;
    this.LocService.GetLocalByfilialeId(selectedObject.filialId).subscribe(data => {
      this.LocalList = data;

    });

    console.log("hello");
    console.log(this.selectedObject)
    console.log(this.LocalList)
    console.log('lll')
    console.log(this.selectedObject1)
  }



}