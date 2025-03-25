import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CajasService } from '../../services/cajas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent {

  cajeros: any[] = [];

  constructor(private CajasSv: CajasService) { }

  ngOnInit() {
    this.CajasSv.getCajas().subscribe((CajasResponse: any) => {
      this.cajeros = CajasResponse.response;
      console.log(this.cajeros);
    });
  }


}
