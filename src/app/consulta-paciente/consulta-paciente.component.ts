import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getDatabase, onValue, ref } from "firebase/database";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-consulta-paciente',
  templateUrl: './consulta-paciente.component.html'
})
export class ConsultaPacienteComponent implements OnInit {
  database = getDatabase();
  data: any;
  arrayData: Array<Object> | undefined;

  datoInput = new FormGroup({
    namePaciente: new FormControl('')
  })

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  leerDatos(){
    this.data = null;
    const name = this.datoInput.controls.namePaciente.value;
    const convertData = Object.assign(name);
    // const parse = JSON.parse(name);
    console.log(typeof(convertData));
    let user = this.authService.afAuth.onAuthStateChanged((user) => {
      const starCountRef = ref(this.database, 'users/' + `${user?.uid}/` + 'paciente/' + `${convertData}`);
      onValue(starCountRef, (snapshot) => {
        this.data = snapshot.val();
        this.arrayData = this.data;
      });
      console.log(starCountRef);
    });
  }

  vaciarDatos(){
    this.data = null || undefined;
  }
}
