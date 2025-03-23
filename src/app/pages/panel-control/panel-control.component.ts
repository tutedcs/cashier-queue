import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CajerosService } from '../../services/cajeros.service';

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent {

  cajeros: any[] = [];

  constructor(private cajeroSv: CajerosService) { }

  ngOnInit() {
    console.log(this.cajeros);
  }


}
