import { Component } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-2.component.html',
  styleUrl: './seccion-2.component.css'
})
export class Seccion2Component {
  cajaDisponible: any = null; // Solo almacenará el primer elemento disponible
  
  constructor(private cajasSv: CajasService) { }
  
  ngOnInit(): void {
    this.getCajas();
    setInterval(() => {
      this.getCajas();
    }, 1000);
  }

  getCajas() {
    this.cajasSv.getDisponiblesXSeccion(3).subscribe((data: any) => {
      this.cajaDisponible = data.response.length > 0 ? data.response[0] : null; // Toma el primer elemento o null si no hay disponibles
      console.log(this.cajaDisponible);
    });
  }
}
