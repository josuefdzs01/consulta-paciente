import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  providers: [AuthService]
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('')

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onResetPassword(){
    const email = this.userEmail.value;
    this.authService.resetPassword(email).then(res => {
      this.toastr.info('Checa tu correo...');
      this.router.navigate(['/login']);
    }, (error) => {
      this.toastr.error('Ocurrio un error intenta de nuevo');
    });
  }

}
