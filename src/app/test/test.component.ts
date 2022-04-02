import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Norme } from '../norme';
import { NormeServiceService } from '../services/norme-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  formCum = this.fb.group({
    designation: [""]
  });
  // cumulative: Norme = {}
  listRubriques: Norme[] = []
  filterForm: FormGroup | undefined

  constructor(private rubriqueCumulativeService: NormeServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  createFormCumul(cumulative: Norme) {
    // this.formCum = new FormGroup({
    //   id: new FormControl(cumulative.id ? cumulative.id : undefined),
    //   date: new FormControl(cumulative.date, Validators.required),
    //   comment: new FormControl(cumulative.comment, Validators.required),


    // })
  }

  submitFormCum() {
    if (!this.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    /* this.cumulative = {
       normeId:this.cumulative.normeId,
       designation: this.formCum.controls['designation'].value,
      
     }*/
    //alert(this.cumulative.name);

    //this.formCum.reset()
    //   if(this.cumulative.normeId==undefined){
    /*  this.rubriqueCumulativeService.postNorme(this.cumulative).subscribe((res) => {
        
      //  this.cumulative={}
       // this.createFormCumul(this.cumulative)
       
      })
    }
    
  console.log('hi');
  console.log(this.cumulative);
  alert(this.cumulative.designation); 
    
   
  }
  */
  }
}