import { Component, OnDestroy, OnInit } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-1.component.html',
  styleUrl: './seccion-1.component.css'
})
export class Seccion1Component implements OnInit {
  cajaDisponible: any = null;
  private timeoutHandle: any;
  private subscription: Subscription = new Subscription;

  constructor(private cajasSv: CajasService) {}

  ngOnInit(): void {
    this.getCajas();
    setInterval(() => {
      this.getCajas();
    }, 10000);
  }

  getCajas() {
    this.cajasSv.getDisponiblesXSeccion(2).subscribe((data: any) => {
      this.cajaDisponible = data.response.length > 0 ? data.response[0] : null; // Toma el primer elemento o null si no hay disponibles
      if (this.cajaDisponible) {
        console.log(this.cajaDisponible);
        Swal.fire({
          title: 'Caja Disponible',
          text: `Caja ${this.cajaDisponible.nCaja} está disponible`,
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5000,
          width: '400px', // Adjusted width to make it bigger
          padding: '2rem', // Added padding for a larger appearance
          backdrop: true, // Ensures the backdrop is visible
          customClass: {
        popup: 'swal2-large-popup', // Custom class for further styling
        title: 'swal2-large-title', // Custom class for title
          },
        }).then(() => {
          if (this.timeoutHandle) {
        clearTimeout(this.timeoutHandle);
          }
          this.timeoutHandle = setTimeout(() => {
        this.getCajas();
          }, 10000); // Waits 10 seconds before fetching again
        });
      }
    });
  }
}