import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  providers: [AuthService]
})
export class VerificationEmailComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  sendEmailVerification(){
    this.authService.sendEmail().then(response => {
      this.toastr.info('Revisa tu correo para verificarlo...');
    }, (error) => {
      this.toastr.error('Hubo un error intenta nuevamente');
    });
  }

}
