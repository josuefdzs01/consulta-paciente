import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;

  email: any;

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
      let user = this.authService.afAuth.onAuthStateChanged((user) => {
        this.email = user?.email;
      });
     }

  ngOnInit() {
  }

  async logout(){
    return await new Promise(async (resolve, reject) => {
      this.authService.logout().then(async (responseRegister: any) => {
        this.toastr.success('Cerrando sesión');
        this.router.navigate(['/login']);
      }).catch((error) => {
        this.toastr.error('Hubo un error');
      });
    });
  }

}
