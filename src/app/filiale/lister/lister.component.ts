import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Filiale } from 'src/app/filiale';
import { FilialeService } from 'src/app/services/filiale.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css']
})
export class ListerComponent implements OnInit {
  filialName: any;
  
  constructor(public filialeService: FilialeService, private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private localService: LocalService) {
  }


  ngOnInit(): void {
   this.refreshfilList();
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
  polename: any
  SearchPole() {
    if (this.polename == '') {
      //    this.ngOnInit()
      this.refreshfilList()
    } else {
      this.filialeService.filList = this.filialeService.filList.filter((res: { polename: string; }) => {
        return res.polename.toLocaleLowerCase().match(this.polename.toLocaleLowerCase());
      })
    }
  }

  Search() {
    if (this.filialName == '') {
      //   this.ngOnInit()
      this.refreshfilList()
    } else {
      this.filialeService.filList = this.filialeService.filList.filter((res: { filialName: string; }) => {
        return res.filialName.toLocaleLowerCase().match(this.filialName.toLocaleLowerCase());
      })
    }
  }
  refreshfilList() {
    console.log('List')
    this.filialeService.getFilialeList().subscribe(data => {
      this.filialeService.filList = data;
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
