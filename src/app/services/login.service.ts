import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs'; // Ensure 'of' is imported
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

    logOut(idUsuario: number): void {
        this.http.post(this.API_URL + 'Logout', idUsuario, {
            headers: { 'Content-Type': 'application/json' }
        }).subscribe({
            next: () => {
                sessionStorage.removeItem('session');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error('Error en logout:', err);
            }
        });
    }
    
    

    register (userRegister: userRegister): Observable<any> {
        return this.http.post(this.API_URL + 'Register', userRegister);
    }

    checkLogin(): Observable<any> {
        if (!sessionStorage.getItem('session')) {
            this.router.navigate(['/login']);
            return new Observable(observer => {
                observer.next(false);
                observer.complete();
            });
        } else {
            const session = JSON.parse(sessionStorage.getItem('session') || '{}');
            return of(session); // Wrap the session object in an Observable
        }
    }
}