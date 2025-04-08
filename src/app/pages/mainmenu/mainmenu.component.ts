import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { UsuariosService } from '../../services/usuarios.service';
import { CajasService } from '../../services/cajas.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.css'
})
export class MainmenuComponent {

  idUsuario: number = 0;
  idCaja: number = 0;
  nCaja: number = 0;
  nSeccion: number = 0;
  nombreUsuario: string = '';

  disponibilidad: boolean = false;
  timerNoDisponible: string = '00:00';
  totalNoDisponible: string = '00:00';

  constructor(private usuarioSv: UsuariosService, 
              private cajasSv: CajasService,
              private loginSv: LoginService){}

  ngOnInit() {
    this.loginSv.checkLogin()
    
    const session = sessionStorage.getItem('session')
    if (session) {
      const lol= JSON.parse(session);
      console.log(lol);
      this.idUsuario = lol.idUsuario;
      this.usuarioSv.getUsuarioXid(this.idUsuario).subscribe((res:any) => {
        console.log(res);
        this.cajasSv.GetInfoCaja(res.idCaja).subscribe((res2:any) => {
          console.log(res2.response);
          this.idCaja = res2.response[0].idCaja;
          this.nCaja = res2.response[0].nCaja;
          this.nSeccion = res2.response[0].seccion;
        })
      })

    } 
  }


  switchDisponibilidad() {
    this.disponibilidad = !this.disponibilidad;
    if (this.disponibilidad) {
      this.cajasSv.notifyCajaDisponible(this.idCaja);
    }


    // this.cajasSv.switchDisponibilidad(this.idCaja).subscribe((res:any) => {
    //   console.log(res);
    // })
    // if (this.disponibilidad === false) {
    //     let totalSeconds = 0;
    //     this.timerNoDisponible = '00:00'; // Inicializa el temporizador en 00:00
    //     const interval = setInterval(() => {
    //         totalSeconds++;
    //         const minutes = Math.floor(totalSeconds / 60);
    //         const seconds = totalSeconds % 60;
    //         this.timerNoDisponible = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    //         if (this.disponibilidad) {
    //             clearInterval(interval);
    //             const [currentTotalMinutes, currentTotalSeconds] = this.totalNoDisponible.split(':').map(Number);
    //             const newTotalSeconds = currentTotalMinutes * 60 + currentTotalSeconds + totalSeconds;
    //             const newTotalMinutes = Math.floor(newTotalSeconds / 60);
    //             const newTotalRemainingSeconds = newTotalSeconds % 60;
    //             this.totalNoDisponible = `${newTotalMinutes.toString().padStart(2, '0')}:${newTotalRemainingSeconds.toString().padStart(2, '0')}`;
    //             localStorage.setItem('SessionData', JSON.stringify({ idUsuario: this.idUsuario, totalNoDisponible: this.totalNoDisponible }));
    //         }
    //     }, 1000);
    // }
  }
  
}
