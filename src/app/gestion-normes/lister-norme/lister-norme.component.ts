import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Norme } from 'src/app/norme';
import { CritereService } from 'src/app/services/critere.service';
import { NormeServiceService } from 'src/app/services/norme-service.service';

@Component({
  selector: 'app-lister-norme',
  templateUrl: './lister-norme.component.html',
  styleUrls: ['./lister-norme.component.css']
})
export class ListerNormeComponent implements OnInit {
  NormeList: any = []
  CritereList: any = []

  designation:any
  p: number=1;
  key:string='id'
  reverse:boolean=false 
  
 /* NormeList: Array<{ normeId: string, designation: string }> = [
    { normeId: "1", designation: "Nettoyer" },
    { normeId: "3", designation: 'Ranger' },
    { normeId: "3", designation: 'Etre rigoureux' },
    { normeId: "4", designation: "Maintenir l'ordre" },
    { normeId: "5", designation: "Débarrasser" },
  ]*/
  constructor(public normeService: NormeServiceService, private fb: FormBuilder, private router: Router, public critereService: CritereService) { }
  ngOnInit(): void {
    this.refreshnormList();
   // this.refreshcriList(Norme);
    
  }
  detnorme(item: any) {
    this.router.navigate(['/cri', item.normeId]);
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      alert(item.normeId)
      this.normeService.deleteNorle(item.normeId).subscribe(data => {
        alert(data.toString());
        this.refreshnormList();
      })
    }
  }

  ChangeData(norme: Norme) {

    this.normeService.formCum.reset({
      normeId: norme.normeId,
      designation: norme.designation,
    });
  }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
    });
  }
  refreshcriList(e: any) {
    //this.isShown = true;
    this.critereService.getCritereByNorme(e.normeId).subscribe(data => {
      this.CritereList = data;
      console.log(this.CritereList)
    });

  }
  
  Search(){
    if (this.designation==''){
      this.ngOnInit()
    }else{this.NormeList = this.NormeList.filter((res: { designation: string; }) => {
      return res.designation.toLocaleLowerCase().match(this.designation.toLocaleLowerCase());
    })
    } 
  }

  sort(key:any)
  {
    this.key=key;
    this.reverse=!this.reverse;
  }

}
