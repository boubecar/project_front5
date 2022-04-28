import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Filiale } from 'src/app/filiale';
import { FilialeService } from 'src/app/services/filiale.service';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css']
})
export class ListerComponent implements OnInit {
  idnorm: string = ''
  formCum!: FormGroup;
  constructor(public filialeService: FilialeService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.route.params.subscribe((params: any) => console.log(params));
  }
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
    this.route.params.subscribe(params => {
      this.idnorm = params['id'];
    })
    this.formCum = this.fb.group({
      filialeId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      filialeName: ['', Validators.required],
      poleId: this.idnorm,
    });
    this.refreshfilList()
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

    this.formCum.reset({
      filialeId: fil.filialId,
      filialeName: fil.filialName,
      image: fil.image
    });
    this.refreshfilList();



  }
  refreshfilList() {
    //this.isShown = true;
    this.filialeService.GetAllfilialeByPole(this.idnorm).subscribe(data => {
      this.filList = data;
      console.log(this.filialeService)
    });

  }
  detfil(item: any) {
    this.router.navigate(['/lf', item.filialId]);
  }
}
