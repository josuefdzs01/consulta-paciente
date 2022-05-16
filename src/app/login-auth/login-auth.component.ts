import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  providers: [AuthService]
})
export class LoginAuthComponent implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private loginService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onLogin(){
    const{email, password} = this.loginForm.value;
    this.loginService.login(email, password).then((responseLogin: any) => {
      this.toastr.success('Se inicio sesion correctamente');
      if(responseLogin && responseLogin.user._delegate.emailVerified){
        this.router.navigate(['/register-paciente']);
      }else if(responseLogin){
        this.router.navigate(['/verification-email']);
      }else {
        this.router.navigate(['/register-auth']);
      }
      }).catch((error) => {
        this.toastr.error('Hubo un error al iniciar sesión');
      });
  }

}
