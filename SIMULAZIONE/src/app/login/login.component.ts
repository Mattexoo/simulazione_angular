import { Component } from '@angular/core';
import { Appointment } from '../Appointment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model:Appointment ={
    id: 0,
    genere: "",
    nome: "",
    cognome: "",
    mail: "",
    citta: "",
    categoria: "",
    data_scadenza_contratto: "",
    pwd: ""
  }
  accesso: boolean = false;
  async accedi(): Promise<void> {
    const response = await fetch("http://localhost:8888/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: JSON.stringify({ mail: this.model.mail, pwd: this.model.pwd })
    });
    this.accesso = await response.json();
    console.log(this.accesso); 
  }
}
