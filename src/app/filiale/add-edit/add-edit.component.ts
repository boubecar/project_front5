import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilialeService } from 'src/app/services/filiale.service';
import { PoleServiceService } from 'src/app/services/pole-service.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  formCum!: FormGroup; 
 /* PoleList: Array<{ PoleId: number, PoleName: string, image: string }> = [
    { PoleId: 1, PoleName: "alimentation-animale", image: "assets/images/alimentation-animale.png" },
    { PoleId: 2, PoleName: 'agroalimentaire', image: "assets/images/agrico.png" },
    { PoleId: 3, PoleName: 'avicole', image: "assets/images/avicole.jpg" },
    { PoleId: 4, PoleName: "industrielle", image: "assets/images/industrielle.png" },
  ];*/
  PoleList:any 
  filList: any = []

  idnorm: String = '';
  constructor(public service :PoleServiceService,public filService: FilialeService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.params.subscribe((params: any) => console.log(params));
  }
   
    ngOnInit(): void {
      this.refreshPoleList()
    this.route.params.subscribe(params => {
      this.idnorm = params['id'];
    })

    this.refreshfilList();
    this.formCum = this.fb.group({
      filialId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      filialName: ['', Validators.required],
      poleId: ['00000000-0000-0000-0000-000000000000', Validators.required],
    });
  }
  refreshPoleList() {
   
    this.service.getPoleList().subscribe(data => {
      this.PoleList = data;
      console.log("pole",this.PoleList)
    });
  }
  public saveData() {
    /*if (!this.formCum.valid) {
     // alert("veuillez remplir tous les champs")
    }*/
    console.log(this.formCum.value);
    if (this.formCum.controls['filialId'].value == '00000000-0000-0000-0000-000000000000') {
      console.log("post")
      console.log(this.formCum.value);
      this.filService.postFiliale(this.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshfilList();
      })
    }
    else {
      console.log("put")
      console.log(this.formCum.value);
      this.filService.updateFiliale(this.formCum.value).subscribe(res => {
        alert(res.toString());
        this.refreshfilList();
        //  this.cumulative={}
      })
    }

    console.log('hello');
    console.log(this.formCum.value);
    // alert(this.cumulative.designation);
  }
  refreshfilList() {
    this.filService.getFilialeList().subscribe(data => {
      this.filList = data;
    });
  }
}
