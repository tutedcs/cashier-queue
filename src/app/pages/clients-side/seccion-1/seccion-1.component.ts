import { Component } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';

@Component({
  selector: 'app-seccion-1',
  standalone: true,
  imports: [],
  templateUrl: './seccion-1.component.html',
  styleUrl: './seccion-1.component.css'
})
export class Seccion1Component {
  cajas: any[] = [];
  
    constructor(private cajasSv: CajasService) { }
  
    ngOnInit(): void {
      this.cajasSv.getDisponiblesXSeccion(2).subscribe((data: any) => {
        this.cajas = data.response;
        console.log(this.cajas);
      });
    }
}
