import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../env/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    API_URL = Environment.apiUrl + 'Usuario/';

    constructor(private http: HttpClient) { }


    getUsuarios(): Observable<any> {
        return this.http.get(this.API_URL + 'Listar');
    }

    searchUsuario(nombre: string, apellido: string): Observable<any> {
        const params = {
            nombre: nombre,
            apellido: apellido
        }
        return this.http.get(this.API_URL + 'Buscar', { params });
    }

    desactivarUsuario(idUsuario: number): Observable<any> {
        return this.http.put(this.API_URL + 'Desactivar/' + idUsuario, {});
    }

    activarUsuario(idUsuario: number): Observable<any> {
        return this.http.put(this.API_URL + 'Activar/' + idUsuario, {});
    }
}