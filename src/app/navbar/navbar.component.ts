import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  rolUser: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const session = sessionStorage.getItem('session')
    if (session) {
      this.rolUser = JSON.parse(session).rol;
      console.log(this.rolUser);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
