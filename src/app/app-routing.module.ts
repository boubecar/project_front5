import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { CritereComponent } from './critere/critere.component';
import { EmailComponent } from './email/email.component';
import { NoteUserComponent } from './espace_responsable/note-user/note-user.component';
import { ProfileUserComponent } from './espace_responsable/profile-user/profile-user.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { FilLocalComponent } from './fil-local/fil-local.component';
import { FilialeComponent } from './filiale/filiale.component';
import { GestionNormesComponent } from './gestion-normes/gestion-normes.component';
import { AuthGuardService } from './guards/auth.service';
import { HomeComponent } from './home/home.component';
import { LocalComponent } from './local/local.component';
import { NormesComponent } from './normes/normes.component';
import { NoteComponent } from './note/note.component';
import { DetailPoleComponent } from './pole/detail-pole/detail-pole.component';
import { PoleComponent } from './pole/pole.component';
import { ProfileComponent } from './profile/profile.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'rec', component: ReclamationComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'pole', component: PoleComponent, canActivate: [AuthGuardService] },
  { path: 'mail', component: EmailComponent, canActivate: [AuthGuardService] },
  { path: 'evaluation', component: EvaluationComponent, canActivate: [AuthGuardService] },
  { path: 'norme', component: NormesComponent, canActivate: [AuthGuardService] },
  { path: 'gnorme', component: GestionNormesComponent, canActivate: [AuthGuardService] },
  { path: 'critere', component: CritereComponent, canActivate: [AuthGuardService] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuardService] },
  { path: 'filiale', component: FilialeComponent, canActivate: [AuthGuardService] },
  { path: 'note', component: NoteComponent, canActivate: [AuthGuardService] },
  { path: 'cri/:id', component: CritereComponent, canActivate: [AuthGuardService] },
  { path: 'fl/:id', component: FilialeComponent, canActivate: [AuthGuardService] },
  { path: 'lf/:id', component: FilLocalComponent, canActivate: [AuthGuardService] },
  { path: 'loc', component: FilLocalComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'md', component: DetailPoleComponent, canActivate: [AuthGuardService] },
  { path: 'note_user', component: NoteUserComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: ProfileUserComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
