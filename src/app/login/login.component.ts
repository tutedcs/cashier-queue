import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginSv: LoginService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {    
    if (this.form.valid) {
      const userLogin = {
        usuario: this.form.value.usuario,
        password: this.form.value.password
      }
      this.loginSv.login(userLogin).subscribe((data: any) => {
        console.log('Login response:', data); // Add logging to check the response
        if (data.code == 'LOGIN_SUCCESS') {
          // localStorage.setItem('idUsuario', data.token);
          sessionStorage.setItem('session', JSON.stringify({
            idUsuario: data.idUsuario,
            nombre: data.nombre,
            apellido: data.apellido,
            rol: data.rol,
          }));        

          Swal.fire({
            icon: 'success',
            timer: 5000,
            showConfirmButton: false,
            title: 'Bienvenido ' + data.nombre + ' ' + data.apellido,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(['/mainmenu']);
          });
        }
      }, (error) => {
        console.error('Login error:', error); // Add logging to check for errors
        Swal.fire({
          icon: 'error',
          timer: 3000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          title: 'Ha ocurrido un error, intente de nuevo'
        });
      });
    }
  }
}