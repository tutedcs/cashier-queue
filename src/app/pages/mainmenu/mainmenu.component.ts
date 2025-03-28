import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { UsuariosService } from '../../services/usuarios.service';
import { CajasService } from '../../services/cajas.service';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.css'
})
export class MainmenuComponent {
  nCaja: number = 0;
  nSeccion: number = 0;
  nombreUsuario: string = '';

  constructor(private usuarioSv: UsuariosService, private cajasSv: CajasService) {}

  ngOnInit() {
    const session = sessionStorage.getItem('session')
    if (session) {
      const lol= JSON.parse(session);
      this.usuarioSv.getUsuarioXid(lol.idUsuario).subscribe((res:any) => {
        this.cajasSv.GetInfoCaja(res.caja).subscribe((res2:any) => {
          console.log(res2.response[0]);
          this.nCaja = res2.response[0].nCaja;
          this.nSeccion = res2.response[0].seccion;
        })
      })
    }
  }
  
}
