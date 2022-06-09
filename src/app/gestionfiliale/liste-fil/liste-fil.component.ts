import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiale } from 'src/app/filiale';
import { FilialeService } from 'src/app/services/filiale.service';
import { LocalService } from 'src/app/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-fil',
  templateUrl: './liste-fil.component.html',
  styleUrls: ['./liste-fil.component.css']
})
export class ListeFilComponent implements OnInit {

  constructor(public filialeService: FilialeService,private route: ActivatedRoute, private fb: FormBuilder, private router: Router , private localService: LocalService) {}

  ngOnInit(): void {
    this.refreshfilList()
  }

  refreshfilList() {
    console.log("List")
    this.filialeService.getFilialeList().subscribe(data => {
      this.filialeService.filList = data;
      console.log(this.filialeService)
    });

  }
  deleteClick(item: any) {
    Swal.fire({
      title: 'Êtes vous sûrs?',
      text: "Voulez supprimer cette filiale !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, Supprimez !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.filialeService.deleteFiliale(item.filialId).subscribe(data => {
          //alert(data.toString());
          Swal.fire(
            'supprimé!',
            'une filiale est supprimé avec succès .',
            'success'
          )
          this.refreshfilList();

        })
      }
    })



  }
  ChangeData(fil: Filiale) {
    console.log("change", fil)
    this.filialeService.formCum.reset({
      filialId: fil.filialId,
      filialName: fil.filialName,
      poleId: fil.poleId,
    });
  }

  detfil(item: any) {
    //this.router.navigate(['/lf', item.filialId]);
    this.localService.GetAllLocalByFilale(item.filialId).subscribe(data => {
      this.localService.detFiliale = data;
    });
  }



}
