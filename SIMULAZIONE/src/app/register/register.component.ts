import { Component } from '@angular/core';
import { Appointment } from '../Appointment';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: Appointment = {
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
  reg: any = false;
  async registrati(): Promise<void> {
    const response = await fetch("http://localhost:8888/register", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: JSON.stringify({ id: this.model.id, genere: this.model.genere, nome: this.model.nome, cognome:this.model.cognome, mail: this.model.mail, citta:this.model.citta, categoria: this.model.categoria, data_scadenza_contratto: this.model.data_scadenza_contratto, pwd: this.model.pwd })
    });
    this.reg = await response.json();
    console.log(this.reg); 
    if(this.reg == "aggiunto"){
      this.reg = true;
    }
  }
}
