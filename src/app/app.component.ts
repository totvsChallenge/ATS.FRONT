import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ATSFront';

  isLogged(): boolean {
    return localStorage.getItem('user') !== null
  }
}
