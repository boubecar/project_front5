import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Filiale } from '../filiale';
import { FilialeService } from '../services/filiale.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-filiale',
  templateUrl: './filiale.component.html',
  styleUrls: ['./filiale.component.css']
})
export class FilialeComponent implements OnInit {
  constructor(public filialeService: FilialeService,private route: ActivatedRoute, private fb: FormBuilder, private router: Router , private localService: LocalService) {
  }

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
  @ViewChild('myModal') myModal: any;

  public open ()
 {
 
  this.filialeService.formCum.enable();
  this.filialeService.formCum.reset({
    filialId: '00000000-0000-0000-0000-000000000000',
    filialName: '',
    poleId: '00000000-0000-0000-0000-000000000000',
  });
  this.myModal.nativeElement.className = 'modal fade show';
 
 
 }
  ChangeData(fil: Filiale) {
    debugger
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
