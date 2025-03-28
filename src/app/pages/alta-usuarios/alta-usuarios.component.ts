import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeccionService } from '../../services/seccion.service';
import { CajasService } from '../../services/cajas.service';

@Component({
  selector: 'app-alta-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, NavbarComponent, CommonModule, NgxPaginationModule],
  templateUrl: './alta-usuarios.component.html',
  styleUrl: './alta-usuarios.component.css'
})
export class AltaUsuariosComponent {
  form: FormGroup;
  formSearch: FormGroup;
  usuarios: any[] = [];
  cajas: any[] = [];
  secciones: any[] = [];

  selectCaja: boolean = false;

   // ---- Variables para la paginación ----
   currentPageTotal = 1;
   currentPage = 1;


  // public showPassword: boolean = false;

  
  constructor(private router: Router, private fb: FormBuilder, 
    private usuarioSv: UsuariosService, private loginSv: LoginService,
    private seccionSv: SeccionService, private cajasSv: CajasService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      rol: ['', Validators.required],
      seccion: [''],
      caja: ['', Validators.required],
    });
    this.formSearch = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getUsuarios();
    this.getSecciones();

    this.form.get('rol')?.valueChanges.subscribe((value) => {
      if (value==='1') {
        this.selectCaja = false;
      } else {
        this.selectCaja = true;
      }
    });

    this.form.get('usuario')?.valueChanges.subscribe((value) => {
      this.checkExistingUser(value);
    });

    this.formSearch.get('search')?.valueChanges.subscribe((value) => {
      this.usuarioSv.getUsuarios(value).subscribe((data: any) => {
        this.usuarios = data;
      });
    });



    this.form.get('seccion')?.valueChanges.subscribe((value) => {
      console.log(value);
      this.cajasSv.GetCajasXSeccion(value).subscribe((data: any) => {
        this.cajas = data.response;
      });
    });
  }

  getUsuarios() {
    this.usuarioSv.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  getSecciones() {
    this.seccionSv.getSecciones().subscribe((data: any) => {
      this.secciones = data.data;
    });
  }

  submitForm(){
    if (this.form.valid){
      const usuario = this.form.get('usuario')?.value;
      const nombre = this.form.get('nombre')?.value;
      const apellido = this.form.get('apellido')?.value;
      const rol = this.form.get('rol')?.value;
      const caja = this.form.get('caja')?.value;
      
      const params = { 
        usuario, 
        nombre, 
        apellido, 
        rol: Number(rol), // Asegura que es un número 
        caja: Number(caja) // Asegura que es un número 
      };    
      console.log(params);
      this.loginSv.register(params).subscribe((data: any) => {
          if (data.code==='200'){
            Swal.fire({
              icon: 'success',
              title: 'Usuario registrado',
              text: 'El usuario se ha registrado correctamente',
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true
            }).then((result) => {
              this.getUsuarios();
              this.form.reset();
              this.selectCaja = false;
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
      title: 'Por favor, rellene todos los campos',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
      toast: true,
      position: 'top-end'
    });
  } 
  }

  onSubmit() {
    const rol = this.form.get('rol')?.value;

    if (rol==='1') {
      this.form.get('caja')?.setValue(12); 
      // Caja por defecto para usuarios de tipo 1
      // en un entorno correcto, pasaria a ser 0
      this.form.get('seccion')?.setValue(0);
      this.submitForm();
    } else {
      this.submitForm();
    }
  }

  cambiarCajaUsuario(idUsuario: number) {
    // Obtener las secciones y cajas antes de mostrar el formulario
    this.getSecciones();

    Swal.fire({
      title: 'Cambiar caja',
      html: `
        <h5>Seleccione la sección:</h5>
        <select id="seccion-select" class="form-select" style="width: 100%; max-width: 400px; margin: 0 auto;">
          ${this.secciones.map(seccion => `<option value="${seccion.idSeccion}">${seccion.nSeccion}</option>`).join('')}
        </select>
        <h5 class="mt-3">Seleccione la caja:</h5>
        <select id="caja-select" class="form-select" style="width: 100%; max-width: 400px; margin: 0 auto;">
          <option value="">Seleccione una sección primero</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const seccionId = (document.getElementById('seccion-select') as HTMLSelectElement).value;
        const cajaId = (document.getElementById('caja-select') as HTMLSelectElement).value;

        if (!seccionId || !cajaId) {
          Swal.showValidationMessage('Debe seleccionar una sección y una caja');
          return null;
        }

        return { seccionId: Number(seccionId), cajaId: Number(cajaId) };
      }
    }).then(result => {
      if (result.isConfirmed && result.value) {
        const { seccionId, cajaId } = result.value;

        // Aquí puedes llamar al servicio para actualizar la caja del usuario
        this.usuarioSv.setCaja(idUsuario, cajaId).subscribe((response:any) => {
          if (response.code === '200') {
            Swal.fire({
              icon: 'success',
              title: 'Caja actualizada',
              text: 'La caja del usuario se ha actualizado correctamente',
              timer: 2000,
              showConfirmButton: false
            });
            this.getUsuarios(); // Actualizar la lista de usuarios
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar la caja del usuario',
              timer: 3000,
              showConfirmButton: false
            });
          }
        });
      }
    });

    // Escuchar cambios en el select de sección para cargar las cajas correspondientes
    setTimeout(() => {
      const seccionSelect = document.getElementById('seccion-select') as HTMLSelectElement;
      const cajaSelect = document.getElementById('caja-select') as HTMLSelectElement;

      seccionSelect.addEventListener('change', () => {
        const seccionId = seccionSelect.value;
        if (seccionId) {
          this.cajasSv.GetCajasXSeccion(Number(seccionId)).subscribe((data: any) => {
            this.cajas = data.response;
            cajaSelect.innerHTML = this.cajas.map(caja => `<option value="${caja.idCaja}">${caja.nCaja}</option>`).join('');
          });
        } else {
          cajaSelect.innerHTML = '<option value="">Seleccione una sección primero</option>';
        }
      });
    }, 0);
  }

  checkExistingUser(usuario: string) {
    this.usuarioSv.searchUsuario(usuario).subscribe((data: any) => {
      if (data.code==='200' && data.coincidencia.length>0) {
        if (data.coincidencia[0]) {
          Swal.fire({
            icon: 'warning',  
            title: 'Usuario ya existente',
            text: 'El usuario ya existe en el sistema',
            showConfirmButton: false,
          });
          this.form.get('usuario')?.setValue('');
        } 
      }
    });

  }

}
