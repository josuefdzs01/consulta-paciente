import { getDatabase, ref, set } from 'firebase/database';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { user } from '../models/registro-auth';
import { getAuth } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html'
})
export class RegistroPacienteComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  public userArray: any = [];

  pacienteForm = new FormGroup({
    nombreP: new FormControl(''),
    apellidoP: new FormControl(''),
    edadP: new FormControl(''),
    pesoP: new FormControl(''),
    generoP: new FormControl(''),
    nacimientoDateP: new FormControl(''),
    telefonoP: new FormControl(''),
    emailP: new FormControl(''),
    direccionP: new FormControl('')
  });

  contactoEmergenciaForm = new FormGroup({
    nombreR: new FormControl(''),
    apellidoR: new FormControl(''),
    edadR: new FormControl(''),
    relacionR: new FormControl(''),
    telefonoR: new FormControl(''),
    emailR: new FormControl(''),
    direccionR: new FormControl('')
  });

  datosMedicosForm = new FormGroup({
    porqueViene: new FormControl(''),
    desdeCuando: new FormControl(''),
    vacuna: new FormControl(''),
    alergias: new FormControl(''),
    anteriormente: new FormControl(''),
    receta: new FormControl('')
  })

  constructor(private authService: AuthService,
    private toastr: ToastrService) {
   }

  ngOnInit() {
  }

  enviarDatos(){
    if(this.pacienteForm || this.contactoEmergenciaForm || this.datosMedicosForm){
      this.authService.getAllUsers().subscribe((usersResponse) => { 
        this.userArray = []; 
        usersResponse.forEach((catData: any) => { 
          this.userArray.push({ 
            id: catData. payload.doc.id, 
            datos: catData.payload.doc.data() 
          }); 
        });
        console.log(this.userArray);
        this.guardarDatos();
        });
      // this.authService.getUser(this.documentId).subscribe((userResponse) => {

      // })
      } 
    }

  guardarDatos(){
    const {nombreP, apellidoP, edadP, pesoP, generoP, nacimientoDateP, telefonoP, emailP, direccionP} = this.pacienteForm.value;
    const {nombreR, apellidoR, edadR, relacionR, telefonoR, emailR, direccionR} = this.contactoEmergenciaForm.value;
    const {porqueViene, desdeCuando, vacuna, alergias, anteriormente, receta} = this.datosMedicosForm.value;
    const database = getDatabase();
    let user = this.authService.afAuth.onAuthStateChanged(function(user) {
      set(ref(database, 'users/' + `${user?.uid}/` + 'paciente/' + `${nombreP}/` + 'datosPaciente/'), {
        Nombre: nombreP,
        Apellido: apellidoP,
        Edad: edadP,
        Peso: pesoP,
        Genero: generoP,
        FechaNacimiento: nacimientoDateP,
        Telefono: telefonoP,
        Correo: emailP,
        Direccion: direccionP
    });
      set(ref(database, 'users/' + `${user?.uid}/` + 'paciente/' + `${nombreP}/` + 'contactoEmergencia/'), {
        Nombre: nombreR,
        Apellido: apellidoR,
        Edad: edadR,
        Relacion: relacionR,
        Telefono: telefonoR,
        Correo: emailR,
        Direccion: direccionR
    });
      set(ref(database, 'users/' + `${user?.uid}/` + 'paciente/' + `${nombreP}/` +  'consulta/'), {
        PorqueViene: porqueViene,
        DesdeCuando: desdeCuando,
        Vacuna: vacuna,
        Alergias: alergias,
        Anteriormente: anteriormente,
        Receta: receta
      });
    });
    this.toastr.success('Se registro correctamente');
    this.onresetForm()
  }  

  onresetForm(){
    this.pacienteForm.reset();
    this.contactoEmergenciaForm.reset();
    this.datosMedicosForm.reset();
  }
}

