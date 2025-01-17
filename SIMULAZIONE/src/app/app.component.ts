import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SIMULAZIONE';
  reset(){
    window.location.reload();
  }
  a=0;
  accedi(){
    this.a=0;
  }
  registrati(){
    this.a=1
  }
}
