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
  filialName:any
  constructor(public filialeService: FilialeService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.route.params.subscribe((params: any) => console.log(params));
  }
//  filList: any = []
  filList: Array<{filialeId: string, filialName: string,image:string,poleName:string}> = [
    {filialeId: "1", filialName: "Mazraa",image:"assets/images/mazraa.jpg",poleName:"Alimentation-animale"},
    {filialeId: "1", filialName: 'Jadida ',image:"assets/images/download.jpg",poleName:"agroalimentaire"},
    {filialeId: "1", filialName: ' Gan',image:"assets/images/alimentation-animale.png",poleName:"industrielle"},
    {filialeId: "1", filialName: "Med oil",image:"assets/images/alimentation-animale.png",poleName:"industrielle"},
    {filialeId: "1", filialName: "oasis",image:"assets/images/oasis.jpg",poleName:"agroalimentaire"},
];

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
      
      this.filialeService.deleteFiliale(item.filialId).subscribe(data => {
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
  poleName:any
  SearchPole()
  {
    if (this.poleName==''){
      this.ngOnInit()
    }else{this.filList = this.filList.filter((res: { poleName: string; }) => {
      return res.poleName.toLocaleLowerCase().match(this.poleName.toLocaleLowerCase());
    })
    } 
  }

  Search(){
    if (this.filialName==''){
      this.ngOnInit()
    }else{this.filList = this.filList.filter((res: { filialName: string; }) => {
      return res.filialName.toLocaleLowerCase().match(this.filialName.toLocaleLowerCase());
    })
    }
  }
  refreshfilList() {
    
    console.log(this.filialeService)
    //this.isShown = true;
    this.filialeService.GetAllfilialeByPole(this.idnorm).subscribe(data => {
    //  this.filList = data;
      console.log(this.filialeService)
    });

  }
  detfil(item: any) {
    this.router.navigate(['/lf', item.filialId]);
  }

}
