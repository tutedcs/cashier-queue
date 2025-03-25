import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../env/environment';
import { userLogin, userRegister } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    API_URL = Environment.apiUrl + 'Usuario/';
    
    constructor(private http: HttpClient, private router: Router) { }

    // Login
    login(UserLogin: userLogin): Observable<any> {
        return this.http.post(this.API_URL + 'Login', UserLogin);
    }

    register (userRegister: userRegister): Observable<any> {
        return this.http.post(this.API_URL + 'Register', userRegister);
    }

    checkLogin(): void {
        if (!sessionStorage.getItem('session')) {
            this.router.navigate(['/login']);
        } else {
            return JSON.parse(sessionStorage.getItem('session') || '{}');
        }
    }
}