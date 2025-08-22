import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CajasService } from '../../services/cajas.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent {

  cajeros: any[] = [];

  constructor(private CajasSv: CajasService, private loginSv: LoginService, 
              private router: Router) { }

  ngOnInit() {
    this.CajasSv.getCajas().subscribe((CajasResponse: any) => {
      this.cajeros = CajasResponse.response;
      console.log(this.cajeros);
    });

    this.loginSv.checkLogin().subscribe((res:any) => {
      console.log(res);
      if (res.rol !== 1) {
        this.router.navigate(['/mainmenu']);
      }
    });

  }

}
