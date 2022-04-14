import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  formCum = this.fb.group({
    note: [''],
    comment: [''],
  });
  eval:string=''


  constructor(private router: Router ,private fb: FormBuilder) { }
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

  
CritereList: Array<{ critereId: number, criterelabel: string, normes: string }> = [
  { critereId: 1, criterelabel: "Nettoyer", normes: "" },
  { critereId: 2, criterelabel: 'Ranger', normes: "" },
  { critereId: 3, criterelabel: 'Etre rigoureux', normes: "" },
  { critereId: 4, criterelabel: "Maintenir l'ordre", normes: "" },
  { critereId: 5, criterelabel: "Débarrasser", normes: "" },
];
  ngOnInit(): void {
  }
  Suiv ()
  {
    if (this.currentQuiz<this.List.length)
    {
      this.currentQuiz++;
      
      console.log(this.formCum.controls['note'].value);
      console.log(this.formCum.controls['comment'].value);
    }
    else 
    {
      this.router.navigateByUrl('/evaluation');
    }
  }
  Pres ()
  {
    if (this.currentQuiz>=0)
    {
      this.currentQuiz--;
      
    }
  }
  
  
}
