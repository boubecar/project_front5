import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Filiale } from 'src/app/filiale';
import { FilialeService } from 'src/app/services/filiale.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css']
})
export class ListerComponent implements OnInit {
  idnorm: string = ''
  formCum!: FormGroup;
  filialName: any
  constructor(public filialeService: FilialeService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router,private localService :LocalService) {
    this.route.params.subscribe((params: any) => console.log(params));
  }
 filList: any = []
 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idnorm = params['id'];
    })
  /*  this.formCum = this.fb.group({
      filialeId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      filialeName: ['', Validators.required],
      poleId: this.idnorm,
    });*/
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
    console.log("change",fil)
    this.filialeService.formCum.reset({
      filialId: fil.filialId,
      filialName: fil.filialName
    });
  }
  polename: any
  SearchPole() {
    if (this.polename == '') {
      this.ngOnInit()
    } else {
      this.filList = this.filList.filter((res: { polename: string; }) => {
        return res.polename.toLocaleLowerCase().match(this.polename.toLocaleLowerCase());
      })
    }
  }

  Search() {
    if (this.filialName == '') {
      this.ngOnInit()
    } else {
      this.filList = this.filList.filter((res: { filialName: string; }) => {
        return res.filialName.toLocaleLowerCase().match(this.filialName.toLocaleLowerCase());
      })
    }
  }
  refreshfilList() {

   // console.log("id pole",this.idnorm)
    //this.isShown = true;
    this.filialeService.getFilialeList().subscribe(data => {
      this.filList = data;
      console.log(this.filialeService)
    });

  }


  detfil(item: any) {
    //this.router.navigate(['/lf', item.filialId]);
    this.localService.GetAllLocalByFilale(item.filialId).subscribe(data => {
      this.localService.detFiliale = data;
    });
  }

}
