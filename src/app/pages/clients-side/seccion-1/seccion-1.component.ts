import { Component, OnDestroy, OnInit } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seccion-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-1.component.html',
  styleUrl: './seccion-1.component.css'
})
export class Seccion1Component implements OnInit, OnDestroy {
  cajaDisponible: any = null;
  private timeoutHandle: any;
  private subscription: Subscription = new Subscription;

  constructor(private cajasSv: CajasService) {}

  ngOnInit(): void {
    // Suscribirse al observable para recibir el idCaja
    this.subscription = this.cajasSv.cajaDisponible$.subscribe((idCaja: number) => {
      this.mostrarCajaPor30Segundos(idCaja);
    });
  }

  mostrarCajaPor30Segundos(idCaja: number) {
    this.cajaDisponible = { nCaja: idCaja };

    // Después de 30 segundos, ocultar la caja disponible
    this.timeoutHandle = setTimeout(() => {
      this.cajaDisponible = null;
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}