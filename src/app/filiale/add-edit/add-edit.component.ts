import { Component, OnInit } from '@angular/core';
import { FilialeService } from 'src/app/services/filiale.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  PoleList:Array<{PoleId: number, PoleName: string,image :string}> = [
    {PoleId: 1, PoleName: "alimentation-animale",image:"assets/images/alimentation-animale.png"},
    {PoleId: 2, PoleName: 'agroalimentaire',image:"assets/images/agrico.png"},
    {PoleId: 3, PoleName: 'avicole',image:"assets/images/avicole.jpg"},
    {PoleId: 4, PoleName: "industrielle",image:"assets/images/industrielle.png"},
];
constructor(public filService: FilialeService) { }
filList: any = []
  ngOnInit(): void {
    this.refreshfilList();
  }
  public saveData() {
    if (!this.filService.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    
    if (this.filService.formCum.controls['filialeId'].value == '00000000-0000-0000-0000-000000000000') {

      console.log("post")
      console.log(this.filService.formCum.value);
      this.filService.postFiliale(this.filService.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshfilList();
      })
    }
    else {
      console.log("put")
      console.log(this.filService.formCum.value);
      this.filService.updateFiliale(this.filService.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshfilList();
        //  this.cumulative={}
      })
    }

    console.log('hello');
    console.log(this.filService.formCum.value);
    // alert(this.cumulative.designation);
  }
  refreshfilList() {
    this.filService.getFilialeList().subscribe(data => {
      this.filList = data;
    });
  }
}
