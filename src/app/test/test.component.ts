import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  currentQuiz = 0;
  List: Array<{ Norme: string, critere: string }> = [
    { Norme: "Nettoyer", critere: "État et propreté du poste de travail" },
    { Norme: "Nettoyer", critere: 'État et propreté des installations' },
    { Norme: "Nettoyer", critere: 'État et propreté des sols (papiers, chiffons éparpillés, stagnation d’eau, poussières)' },
    { Norme: "Nettoyer", critere: "État et propreté des abords /vitres, murs, fenêtres..." },
    { Norme: "Nettoyer", critere: "État et propreté du mobilier, des armoires et des casiers personnels" },
  ];

  ngOnInit(): void {
  }
  Suiv() {
    if (this.currentQuiz < this.List.length) {
      this.currentQuiz++;

      console.log(this.formCum.controls['note'].value);
      console.log(this.formCum.controls['comment'].value);
    }
    else {
      this.router.navigateByUrl('/evaluation');
    }
  }
  Pres() {
    if (this.currentQuiz >= 0) {
      this.currentQuiz--;

    }
  }


}