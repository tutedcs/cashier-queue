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
}