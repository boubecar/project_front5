import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Filiale } from 'src/app/filiale';
import { FilialeService } from 'src/app/services/filiale.service';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css']
})
export class ListerComponent implements OnInit {

  constructor(public filialeService: FilialeService, private fb: FormBuilder) { }
  filList: any = []
  /*filList: Array<{filialeId: string, filialeName: string,image:string}> = [
    {filialeId: "1", filialeName: "Mazraa",image:"assets/images/mazraa.jpg"},
    {filialeId: "1", filialeName: 'Jadida ',image:"assets/images/download.jpg"},
    {filialeId: "1", filialeName: ' Gan',image:"assets/images/alimentation-animale.png"},
    {filialeId: "1", filialeName: "Med oil",image:"assets/images/alimentation-animale.png"},
    {filialeId: "1", filialeName: "oasis",image:"assets/images/oasis.jpg"},
];
*/
  ngOnInit(): void {
    this.refreshfilList()
  }
  refreshfilList() {
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
    });
  }
  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      alert(item.normeId)
      this.filialeService.deleteFiliale(item.normeId).subscribe(data => {
        alert(data.toString());
        this.refreshfilList();
      })
    }
  }
  ChangeData(fil: Filiale) {

    this.filialeService.formCum.reset({
      filialeId: fil.filialId,
<<<<<<< Updated upstream
      filialeName: fil.filialeName,
      image: fil.image
    });
    this.refreshfilList();
=======
      filialeName: fil.filialName,
      image: fil.image
    });
    this.refreshfilList();



>>>>>>> Stashed changes
  }
}
