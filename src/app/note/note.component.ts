import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(private router: Router) { }
  /*public counts = ["Recieved","In Progress","Ready for Billing",
  "Billed","Order Closed"];
  public orderStatus = "In Progress"*/
  currentQuiz =0;
  List: Array<{ Norme: string, critere: string }> = [
    { Norme: "Nettoyer", critere: "État et propreté du poste de travail" },
    { Norme: "Nettoyer", critere: 'État et propreté des installations' },
    { Norme: "Nettoyer", critere: 'État et propreté des sols (papiers, chiffons éparpillés, stagnation d’eau, poussières)' },
    { Norme: "Nettoyer", critere: "État et propreté des abords /vitres, murs, fenêtres..." },
    { Norme: "Nettoyer", critere: "État et propreté du mobilier, des armoires et des casiers personnels" },
  ];

  ngOnInit(): void {
  }
  Suiv ()
  {
    if (this.currentQuiz<this.List.length)
    {
      this.currentQuiz++;
    }
    else 
    {
      /*this._service.updatePatient(this.patient).subscribe(
        data => {*/
      this.router.navigateByUrl('/evaluation');
    }
  }
  
}
