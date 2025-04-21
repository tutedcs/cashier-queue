import { Component } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-seccion-4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-4.component.html',
  styleUrl: './seccion-4.component.css'
})
export class Seccion4Component {
 seccionLocal = 'nucleo-3';
   
     constructor(private cajasSv: CajasService, private ws: WebsocketService) {}
   
     ngOnInit(): void {
       this.ws.startConnection().then(() => {
         this.ws.unirseASeccion(this.seccionLocal);
     
         this.ws.onAsignacion(({ nCaja, seccion }) => {
           if (seccion === this.seccionLocal) {
             console.log(`🟢 Asignación recibida para ${seccion}: Caja ${nCaja}`);
             Swal.fire({
               title: `Dirijase a la caja ${nCaja}`,
               text: `Caja ${nCaja} Disponible`,
               icon: 'success',
               showCancelButton: false,
               showConfirmButton: false,
               timerProgressBar: true,
               timer: 5000,
               width: '500px',
               padding: '2rem',
               backdrop: true,
               customClass: {
                 popup: 'swal2-large-popup',
                 title: 'swal2-large-title',
               },
             })
           }
         });
       });
     }
}
