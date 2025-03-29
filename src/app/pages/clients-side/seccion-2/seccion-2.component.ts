import { Component } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';

@Component({
  selector: 'app-seccion-2',
  standalone: true,
  imports: [],
  templateUrl: './seccion-2.component.html',
  styleUrl: './seccion-2.component.css'
})
export class Seccion2Component {
  cajas: any[] = [];
  
    constructor(private cajasSv: CajasService) { }
  
    ngOnInit(): void {
      this.cajasSv.getDisponiblesXSeccion(3).subscribe((data: any) => {
        this.cajas = data.response;
        console.log(this.cajas);
      });
    }

}
