import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../env/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    API_URL = Environment.apiUrl + 'Usuario/';

    constructor(private http: HttpClient) { }


    getUsuarios(idSeccion?: number): Observable<any> {
        const params = idSeccion ? new HttpParams().set('idSeccion', idSeccion.toString()) : undefined;
        return this.http.get(this.API_URL + 'Listar', { params });
    }

    getUsuarioXid(idUsuario: number): Observable<any> {
        return this.http.get(this.API_URL + 'BuscarPorId/' + idUsuario);
    }

    searchUsuario(usuario: string): Observable<any> {
        const params = new HttpParams()
          .set('usuario', usuario)
    
        return this.http.get(this.API_URL + 'BuscarUsuario', { params });
    }

    setCaja(idUsuario: number, idCaja: number): Observable<any> {
        const body = { idUsuario, idCaja };  // Enviar el objeto en el body
        return this.http.put(this.API_URL + 'SetCaja', body);
    }
    
    desactivarUsuario(idUsuario: number): Observable<any> {
        return this.http.put(this.API_URL + 'Desactivar/' + idUsuario, {});
    }

    activarUsuario(idUsuario: number): Observable<any> {
        return this.http.put(this.API_URL + 'Activar/' + idUsuario, {});
    }
}