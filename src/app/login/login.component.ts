import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    name: '',
    password: ''
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin() {
    if (this.user.name && this.user.password) {
     
      const user = {
        username: this.user
      }
      
      localStorage.setItem('user', JSON.stringify(user))
      this.router.navigate(['/home'])
    } else {
      alert("Insira usuario e senha")
    }
  }

}
