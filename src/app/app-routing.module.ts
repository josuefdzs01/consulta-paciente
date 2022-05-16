import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { VerificationEmailComponent } from './verification-email/verification-email.component';
import { ConsultaPacienteComponent } from './consulta-paciente/consulta-paciente.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { RegistroAuthComponent } from './registro-auth/registro-auth.component';

const routes: Routes = [
  {path: '', component: LoginAuthComponent},
  {path: 'register-auth', component: RegistroAuthComponent},
  {path: 'login', component: LoginAuthComponent},
  {path: 'register-paciente', component: RegistroPacienteComponent},
  {path: 'consulta-paciente', component: ConsultaPacienteComponent},
  {path: 'verification-email', component: VerificationEmailComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
