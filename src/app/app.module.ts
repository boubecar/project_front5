import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { PoleComponent } from './pole/pole.component';
import { ProfileComponent } from './profile/profile.component';
import { EmailComponent } from './email/email.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { AddEditPoleComponent } from './add-edit-pole/add-edit-pole.component';
import { PoleServiceService } from './services/pole-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NormesComponent } from './normes/normes.component';
import { GestionNormesComponent } from './gestion-normes/gestion-normes.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { CritereComponent } from './critere/critere.component';
import { FilialeComponent } from './filiale/filiale.component';
import { ListerNormeComponent } from './gestion-normes/lister-norme/lister-norme.component';
import { AddEditNormeComponent } from './gestion-normes/add-edit-norme/add-edit-norme.component';
import { ListerComponent } from './filiale/lister/lister.component';
import { AddEditComponent } from './filiale/add-edit/add-edit.component';
import { NoteComponent } from './note/note.component';
import { FilLocalComponent } from './fil-local/fil-local.component';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { LocalComponent } from './local/local.component';
import { LocalListComponent } from './local/local-list/local-list.component';
import { UsersComponent } from './users/users.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './authentification/login/login.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { DatePipe } from '@angular/common';
import { DetailPoleComponent } from './pole/detail-pole/detail-pole.component';
import { DetailFilComponent } from './filiale/detail-fil/detail-fil.component';
import { ListerUsersComponent } from './users/lister-users/lister-users.component';
import { NavUserComponent } from './espace_responsable/nav-user/nav-user.component';
import { ProfileUserComponent } from './espace_responsable/profile-user/profile-user.component';
import { NoteUserComponent } from './espace_responsable/note-user/note-user.component';
import { DetailRecComponent } from './reclamation/detail-rec/detail-rec.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ReclamationComponent,
    PoleComponent,
    ProfileComponent,
    EmailComponent,
    EvaluationComponent,
    AddEditPoleComponent,
    NormesComponent,
    GestionNormesComponent,
    TestComponent,
    CritereComponent,
    FilialeComponent,
    ListerNormeComponent,
    AddEditNormeComponent,
    ListerComponent,
    AddEditComponent,
    NoteComponent,
    FilLocalComponent,
    LocalComponent,
    LocalListComponent,
    UsersComponent,
    AuthentificationComponent,
    LoginComponent,
    AddEditUserComponent,
    DetailPoleComponent,
    DetailFilComponent,
    ListerUsersComponent,
    NavUserComponent,
    ProfileUserComponent,
    NoteUserComponent,
    DetailRecComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2OrderModule,

  ],
  providers: [PoleServiceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
