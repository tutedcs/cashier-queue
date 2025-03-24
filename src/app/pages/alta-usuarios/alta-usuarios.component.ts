import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

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
  public showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña
  
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
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioSv.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }

  onSubmit() {
    if (this.form.valid){
      this.loginSv.register(this.form.value).subscribe((data: any) => {
        if (data.code==='USER_REGISTERED'){
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado',
            text: 'El usuario se ha registrado correctamente',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true
          }).then((result) => {
            this.getUsuarios();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ha ocurrido un error al registrar el usuario',
            timer: 4000,
            showConfirmButton: false,
            timerProgressBar: true
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Por favor, rellene todos los campos',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      });
    } 
  }

  desactivarUsuario(idUsuario: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger m-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro? Vas a dar de baja a un usuario',
      text: "No podra usar más el sistema hasta que lo vuelvan a dar de alta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioSv.desactivarUsuario(idUsuario).subscribe((data: any) => {
          console.log(data);
          if (data.code==='200'){
            Swal.fire({
              icon: 'success',
              title: 'Usuario desactivado',
              text: 'El usuario se ha desactivado correctamente',
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true
            }).then((result) => {
              this.getUsuarios();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al desactivar',
              text: 'Ha ocurrido un error al desactivar el usuario',
              timer: 4000,
              showConfirmButton: false,
              timerProgressBar: true
            });
          }
        });
      }
    });

    console.log(idUsuario);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
