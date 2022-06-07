import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Norme } from 'src/app/norme';
import { CritereService } from 'src/app/services/critere.service';
import { NormeServiceService } from 'src/app/services/norme-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lister-norme',
  templateUrl: './lister-norme.component.html',
  styleUrls: ['./lister-norme.component.css']
})
export class ListerNormeComponent implements OnInit {
  NormeList: any = []
  CritereList: any = []

  designation: any
  p: number = 1;
  key: string = 'id'
  reverse: boolean = false

  /* NormeList: Array<{ normeId: string, designation: string }> = [
     { normeId: "1", designation: "Nettoyer" },
     { normeId: "3", designation: 'Ranger' },
     { normeId: "3", designation: 'Etre rigoureux' },
     { normeId: "4", designation: "Maintenir l'ordre" },
     { normeId: "5", designation: "Débarrasser" },
   ]*/
  constructor(public normeService: NormeServiceService, private fb: FormBuilder, private router: Router, public critereService: CritereService) { }
  refreshnormList() {
    this.normeService.getListNormes().subscribe(data => {
      this.NormeList = data;
    });
  }
  ngOnInit(): void {
    this.refreshnormList();
  }
  detnorme(item: any) {
    this.router.navigate(['/cri', item.normeId]);
  }

  deleteClick(item: any) {

    Swal.fire({
      title: 'Êtes vous sûrs?',
      text: "Voulez vous supprimer ce pole!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, Supprimez !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.normeService.deleteNorle(item.normeId).subscribe(data => {
          //alert(data.toString());
        Swal.fire(
          'supprimé!',
          'La norme est supprimé avec succès .',
          'success'
        )
        this.refreshnormList();
        })
      }
    })
  }

  ChangeData(norme: Norme) {

    this.normeService.formCum.reset({
      normeId: norme.normeId,
      designation: norme.designation,
    });
  }

  refreshcriList(e: any) {
    //this.isShown = true;
    this.critereService.getCritereByNorme(e.normeId).subscribe(data => {
      this.CritereList = data;
      console.log(this.CritereList)
    });
  }

 
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
