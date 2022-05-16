import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { getDatabase, ref, set } from "firebase/database";

@Component({
  selector: 'app-registro-auth',
  templateUrl: './registro-auth.component.html',
  providers: [AuthService]
})
export class RegistroAuthComponent implements OnInit {

  title = 'proyecto';

  public documentId: any;
  public currentStatus = 1;

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { 
      this.registerForm.setValue({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: ''
      })
    }
    

  ngOnInit() {
  }

  onRegister(form: any){
    if(this.registerForm.valid){
      if(this.currentStatus == 1){
        let data = {
          nombre: form.nombre,
          apellido: form.apellido,
          telefono: form.telefono,
          email: form.email
        }
        const{password} = this.registerForm.value;
        this.authService.register(data.email, password).then((responseRegister: any) => {
          this.authService.createUser(data, responseRegister.user.uid).then((responseAuth) => {
            this.toastr.success('Se registro correctamente');
            this.registerForm.setValue({
              nombre: '',
              apellido: '',
              telefono: '',
              email: '',
              password: ''
            });
            this.router.navigate(['/verification-email']);
          }, (error) => {
            this.toastr.error('Hubo un error intenta nuevamente1');
          });
        }).catch((error) => {
          this.toastr.error('Hubo un error intenta nuevamente2');
        });
      }
    }else{
      this.toastr.info('Verifica bien los datos que proporcionaste');
    }
  }


  // else {
  //   let data = {
  //     nombre: form.nombre,
  //     apellido: form.apellido,
  //     telefono: form.telefono,
  //     email: form.email,
  //     password: form.password
  //   }
  //   this.authService.updateUser(documentId, data).then(() => {
  //     this.currentStatus = 1;
  //     this.registerForm.setValue({
  //       nombre: '',
  //       apellido: '',
  //       telefono: '',
  //       email: '',
  //       password: ''
  //     });
  //     this.toastr.success('Se edito correctamente');
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }
}
