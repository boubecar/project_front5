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



  ModalTitle: string = "ajouter un nouveau norme";
  constructor(public normeService: NormeServiceService, private fb: FormBuilder, private router: Router, public critereService: CritereService) { }

  ngOnInit(): void {
    this.refreshnormList();
    //this.refreshcriList(Norme);
  }
  detnorme() {
    this.router.navigate(['/critere']);
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      alert(item.normeId)
      this.normeService.deleteNorle(item.NormeId).subscribe(data => {
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
    this.refreshnormList();

    debugger

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

}
