import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-alta-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, NavbarComponent, CommonModule],
  templateUrl: './alta-usuarios.component.html',
  styleUrl: './alta-usuarios.component.css'
})
export class AltaUsuariosComponent {
  form: FormGroup;
  public usuarios: any[] = [];

  constructor(private router: Router, 
    private fb: FormBuilder, 
    private usuarioSv: UsuariosService,
    private loginSv: LoginService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.usuarioSv.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }

  onSubmit() {

  }

}
