import { Component } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../../../services/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-2.component.html',
  styleUrl: './seccion-2.component.css'
})
export class Seccion2Component {
  seccionLocal = 'nucleo-1';
  mensajeCaja: string | null = null;
  
    constructor(private cajasSv: CajasService, private ws: WebsocketService) {}
  
    ngOnInit(): void {
      this.ws.startConnection().then(() => {
        this.ws.unirseASeccion(this.seccionLocal);
    
        this.ws.onAsignacion(({ nCaja, seccion }) => {
          if (seccion === this.seccionLocal) {
            console.log(`🟢 Asignación recibida para ${seccion}: Caja ${nCaja}`);
            this.mensajeCaja = `${nCaja}`;
            setTimeout(() => {
              this.mensajeCaja = null;
            }, 5000); // Ocultar mensaje después de 5 segundos
          }
        });
      });
    }

}
