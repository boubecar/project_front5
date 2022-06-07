import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-gestion-role',
  templateUrl: './gestion-role.component.html',
  styleUrls: ['./gestion-role.component.css']
})
export class GestionRoleComponent implements OnInit {
  roleList :any =[]
  formCum!: FormGroup;
  
  constructor(private role: RoleService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formCum = this.fb.group({
      Id: ['00000000-0000-0000-0000-000000000000', Validators.required],
      name: [""],
    });
    this.getAllRoles()
  }

  ChangeData(local: any) {

    this.formCum.reset({
      locallId: local.locallId,
      localdescription: local.localdescription,
      filialeid: local.filialeid


    });
    this.refrechRoleList();


  }

  public saveData() {
    if (!this.formCum.valid) {
      alert("veuillez remplir tous les champs")
    }
    // this.cumulative = {
    //   normeId:this.cumulative.normeId,
    //   designation: this.formCum.controls['designation'].value,
    // }
    if (this.formCum.controls['locallId'].value == '00000000-0000-0000-0000-000000000000') {
      debugger
      console.log("post")
      console.log(this.formCum.value);
      this.role.postRole(this.formCum.value).subscribe(res => {
        //alert(res.toString());
        //  this.cumulative={}
        if (res == "Added done") {
          // debugger

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'l\'ajout est effectuée avec succèes',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res,
            footer: '<a href="/loc">Erreur de saisie ?</a>'
          })
        }

        this.refrechRoleList();
      })
    }
    else {
      console.log("put")
      console.log(this.formCum.value);
      this.role.editRole(this.formCum.value).subscribe(res => {
        // alert(res.toString());
        if (res == "Updated done") {
          // debugger

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res,
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res,
            footer: '<a href="/role">Veuillez réessayer </a>'
          })
        }
        this.refrechRoleList();
      })


    }

    console.log('hello');
    console.log(this.formCum.value);
    // alert(this.cumulative.designation);
  }
  getAllRoles() {
    this.role.getAllRole().subscribe(roles => {
      this.roleList = roles;
      console.log("list",this.roleList)
    });
  }

  deleteClick(item: any) {

    Swal.fire({
      title: 'Êtes vous sûrs?',
      text: "Voulez vous supprimer ce local !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, Supprimez !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.role.deleteRole(item.locallId).subscribe(data => {
          //alert(data.toString());
          Swal.fire(
            'supprimé!',
            'un role  est supprimé avec succès .',
            'success'
          )
          this.refrechRoleList();
        })
      }
    })
  }
  refrechRoleList() {
    this.role.getRoleList().subscribe(data => {
      this.roleList = data;
      console.log('hay')
      console.log('fil;', this.roleList)
    });
  
  
  }
}


