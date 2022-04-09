import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Norme } from 'src/app/norme';
import { NormeServiceService } from 'src/app/services/norme-service.service';

@Component({
  selector: 'app-lister-norme',
  templateUrl: './lister-norme.component.html',
  styleUrls: ['./lister-norme.component.css']
})
export class ListerNormeComponent implements OnInit {
  NormeList: any = []



  ModalTitle: string = "ajouter un nouveau norme";
  constructor(public normeService: NormeServiceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.refreshnormList()
  }
  detnorme() {
    this.router.navigate(['/critere']);
  }
  norme() {
    this.router.navigate(['/gnorme']);
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
    this.refreshnormList();

    debugger

  }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
    });
  }
}
