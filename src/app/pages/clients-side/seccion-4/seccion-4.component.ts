import { Component } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';

@Component({
  selector: 'app-seccion-4',
  standalone: true,
  imports: [],
  templateUrl: './seccion-4.component.html',
  styleUrl: './seccion-4.component.css'
})
export class Seccion4Component {
  cajas: any[] = [];

  constructor(private cajasSv: CajasService) { }

  ngOnInit(): void {
    this.cajasSv.getDisponiblesXSeccion(5).subscribe((data: any) => {
      this.cajas = data.response;
      console.log(this.cajas);
    });
  }


}
