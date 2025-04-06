import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { CajasService } from '../services/cajas.service';
import { UsuariosService } from '../services/usuarios.service';
import { SeccionService } from '../services/seccion.service';

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
  secciones: any[] = [];
  cajas: any[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, 
              private loginSv: LoginService, private cajasSv: CajasService,
              private usuariosSv: UsuariosService,private seccionSv: SeccionService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  saveSessionStorage(dataLogin: any){
    sessionStorage.setItem('session', JSON.stringify({
      idUsuario: dataLogin.usuario.idUsuario,
      nombre: dataLogin.usuario.nombre,
      apellido: dataLogin.usuario.apellido,
      rol: dataLogin.usuario.rol
    }));  

  }

  selectSeccionYCaja(): void {
    // Obtener las secciones
    this.seccionSv.getSecciones().subscribe((dataSecciones: any) => {
      const secciones = dataSecciones.data;
      console.log('Secciones:', secciones);
  
      // Crear opciones para el select de secciones
      const seccionOptions = secciones.reduce((options: any, seccion: any) => {
        options[seccion.idSeccion] = seccion.nombre;
        return options;
      }, {});
  
      // Mostrar el primer Swal para seleccionar la sección
      Swal.fire({
        title: 'Seleccione una sección',
        input: 'select',
        inputOptions: seccionOptions,
        inputPlaceholder: 'Seleccione una sección',
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
      }).then((seccionResult) => {
        if (seccionResult.isConfirmed && seccionResult.value) {
          const selectedSeccionId = seccionResult.value;
  
          // Obtener las cajas de la sección seleccionada
          this.cajasSv.GetCajasXSeccion(selectedSeccionId).subscribe((dataCajas: any) => {
            const cajas = dataCajas.response;
  
            // Crear opciones para el select de cajas
            const cajaOptions = cajas.reduce((options: any, caja: any) => {
              options[caja.idCaja] = `Caja N° ${caja.nCaja}`;
              return options;
            }, {});
  
            // Mostrar el segundo Swal para seleccionar la caja
            Swal.fire({
              title: 'Seleccione una caja',
              input: 'select',
              inputOptions: cajaOptions,
              inputPlaceholder: 'Seleccione una caja',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
            }).then((cajaResult) => {
              if (cajaResult.isConfirmed && cajaResult.value) {
                const selectedCajaId = cajaResult.value;
  
                // Aquí puedes manejar la sección y caja seleccionadas
                console.log('Sección seleccionada:', selectedSeccionId);
                console.log('Caja seleccionada:', selectedCajaId);
  
                Swal.fire({
                  icon: 'success',
                  title: `Sección y Caja seleccionadas`,
                  text: `Sección: ${seccionOptions[selectedSeccionId]}, Caja: ${cajaOptions[selectedCajaId]}`,
                  timer: 3000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Debe seleccionar una caja válida',
                });
              }
            });
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Debe seleccionar una sección válida',
          });
        }
      });
    });
  }

  onSubmit(): void {    
    if (this.form.valid) {
      this.loginSv.checkUser({ usuario: this.form.value.usuario }).subscribe((dataCheck: any) => {
        if (dataCheck.code == 'NEED_CAJANUM') {
          this.selectSeccionYCaja(); // Llama a la función para seleccionar sección y caja      
        } else if (dataCheck.code == 'NEED_PASSWORD') {
          Swal.fire({
            icon: 'warning',
            title: 'Cuenta de administrador',
            text: 'Por favor, ingrese la contraseña para continuar Sr/a ' +
              dataCheck.usuario.nombre + ' ' + dataCheck.usuario.apellido,
            input: 'password',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              const password = result.value;
              const userLoginWithPassword = {
                usuario: this.form.value.usuario,
                password: password
              };
      
              this.loginSv.login(userLoginWithPassword).subscribe((dataLogin: any) => {
                if (dataLogin.code == 'LOGIN_SUCCESS') {
                  console.log('dataLogin:', dataLogin);
                  this.saveSessionStorage(dataLogin);
                  this.router.navigate(['/mainmenu']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al iniciar sesión',
                    text: 'Por favor, verifique los datos ingresados',
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false
                  });
                }
              });
            }
          });
      
        } else if (dataCheck.code == '401') {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no existente',
            text: 'Por favor, verifique los datos ingresados',
            timer: 3000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Por favor, ingrese los datos requeridos',
        timer: 3000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
      });
    }
  }
}