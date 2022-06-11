import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { LoginComponent } from './authentification/login/login.component';
import { CritereComponent } from './critere/critere.component';
import { EmailComponent } from './email/email.component';
import { NavUserComponent } from './espace_responsable/nav-user/nav-user.component';
import { NoteUserComponent } from './espace_responsable/note-user/note-user.component';
import { PlandactionUserComponent } from './espace_responsable/plandaction-user/plandaction-user.component';
import { ProfileUserComponent } from './espace_responsable/profile-user/profile-user.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { FilLocalComponent } from './fil-local/fil-local.component';
import { FilialeComponent } from './filiale/filiale.component';
import { GestionFilialeComponent } from './gestion-filiale/gestion-filiale.component';
import { GestionNormesComponent } from './gestion-normes/gestion-normes.component';
import { GestionRoleComponent } from './gestion-role/gestion-role.component';
import { AuthGuardService } from './guards/auth.service';
import { RoleGuardService } from './guardsRole/RoleGuardService.service';
import { HomeComponent } from './home/home.component';
import { NormesComponent } from './normes/normes.component';
import { NoteComponent } from './note/note.component';
import { DetailPoleComponent } from './pole/detail-pole/detail-pole.component';
import { PoleComponent } from './pole/pole.component';
import { ProfileComponent } from './profile/profile.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { AuthService } from './services/AuthService';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    },

  },
  {
    path: 'rec', component: ReclamationComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'profile', component: ProfileComponent,

  },
  {
    path: 'pole', component: PoleComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'mail', component: EmailComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'evaluation', component: EvaluationComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'norme', component: NormesComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'gnorme', component: GestionNormesComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'critere', component: CritereComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'test', component: TestComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'filiale', component: FilialeComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'note', component: NoteComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'cri/:id', component: CritereComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'fl/:id', component: FilialeComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'lf/:id', component: FilLocalComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'loc', component: FilLocalComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'users', component: UsersComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'md', component: DetailPoleComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'note_user', component: NoteUserComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'User'
    }
  },
  {
    path: 'home', component: ProfileUserComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'User'
    }
  },
  {
    path: 'role', component: GestionRoleComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'gfilial', component: GestionFilialeComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'rec_user', component: PlandactionUserComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: 'User'
    }
  }
];
const JWT_Module_Options: JwtModuleOptions = {
  config: {

  }
};

@NgModule({

  imports: [RouterModule.forRoot(routes),
  JwtModule.forRoot(JWT_Module_Options)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
