import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { CajasService } from '../services/cajas.service';
import { UsuariosService } from '../services/usuarios.service';

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

  constructor(private fb: FormBuilder, private router: Router, 
              private loginSv: LoginService, private cajasSv: CajasService,
              private usuariosSv: UsuariosService) {
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
      rol: dataLogin.usuario.rol,
    }));  

  }

  onSubmit(): void {    
    if (this.form.valid) {
      const userLogin = {
        usuario: this.form.value.usuario,
      }
      this.loginSv.login(userLogin).subscribe((dataLogin: any) => {
        if (dataLogin.code == '200') {
          console.log('dataLogin:', dataLogin);
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-primary mr-2",
              denyButton: "btn btn-primary mr-2",
              cancelButton: "btn btn-primary mr-2"
            },
            buttonsStyling: true
          });

          if (dataLogin.usuario.rol === 1) {
            swalWithBootstrapButtons.fire({
              icon: 'success',
              title: 'Sesión iniciada',
              text: 'Bienvenido, ' + dataLogin.usuario.nombre + ' ' + dataLogin.usuario.apellido,
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true
            }).then((result) => {
              this.saveSessionStorage(dataLogin);
              this.router.navigate(['/mainmenu']);
            });
          } else {
            console.log(dataLogin.usuario);
            swalWithBootstrapButtons.fire({
              icon: 'success',
              showConfirmButton: true,
              title: 'Bienvenido, ' + dataLogin.usuario.nombre + ' ' + dataLogin.usuario.apellido,
              text: 'Estas logueando en la Caja N° ' + dataLogin.usuario.nCaja + ' de la Seccion ' + dataLogin.usuario.nSeccion + ', Correcto?',
              showCancelButton: true,
              allowEscapeKey: false,
              allowOutsideClick: false,
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) { // Esta logueando en la caja correcta
                Swal.fire({
                  icon: 'success',
                  title: 'Sesión iniciada',
                  text: 'Redirigiendo...',
                  timer: 2000,
                  showConfirmButton: false,
                  timerProgressBar: true
                }).then((result) => {
                  this.saveSessionStorage(dataLogin); 
                  this.router.navigate(['/mainmenu']);
                });                
              } else { // No esta logueando en la caja correcta
                this.cajasSv.getCajasInactivas().subscribe((dataCajas: any) => {
                  console.log('dataCajas:' ,dataCajas);
                  const cajas = dataCajas.response;
                  swalWithBootstrapButtons.fire({
                    title: 'Seleccione el número de caja',  
                    input: 'select',
                    inputOptions: cajas.reduce((options: any, caja: any) => {
                    options[caja.idCaja] = `Caja N° ${caja.idCaja}`;
                    return options;
                    }, {}),
                    inputPlaceholder: 'Seleccione una caja',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                  }).then((result) => {
                    if (result.isConfirmed && result.value) {
                    const selectedCaja = result.value;
                    this.usuariosSv.setCaja(dataLogin.idUsuario, selectedCaja).subscribe((dataSetCaja: any) => {
                      console.log('dataSetCaja:' ,dataSetCaja);
                      if (dataSetCaja.code == '200') {
                        Swal.fire({
                          icon: 'success',
                          title: `Has seleccionado la Caja N° ${selectedCaja}`,
                          text: 'Iniciando sesion',
                          showConfirmButton: true,
                          confirmButtonText: 'Continuar',
                          allowEscapeKey: false,
                          allowOutsideClick: true,
                          timer: 3000,
                          timerProgressBar: true
                        }).then(() => {
                          this.saveSessionStorage(dataLogin); 
                          this.router.navigate(['/mainmenu']);
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Ha ocurrido un error, intente de nuevo'
                        });
                      }
                    });
                    } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Por favor, seleccione una caja válida'
                    });
                    }
                  });
                });
              }
            });
          }

          
        } else if (dataLogin.code == '401') {  
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