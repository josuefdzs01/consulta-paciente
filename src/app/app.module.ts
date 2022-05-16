import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { RegistroAuthComponent } from './registro-auth/registro-auth.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { ConsultaPacienteComponent } from './consulta-paciente/consulta-paciente.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { VerificationEmailComponent } from './verification-email/verification-email.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import{ AngularFireStorageModule } from '@angular/fire/compat/storage';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';


@NgModule({
  declarations: [									
    AppComponent,
      RegistroAuthComponent,
      LoginAuthComponent,
      NavbarComponent,
      RegistroPacienteComponent,
      RegistroPacienteComponent,
      ConsultaPacienteComponent,
      VerificationEmailComponent,
      ForgotPasswordComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
