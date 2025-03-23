import { Routes } from '@angular/router';
import { MainmenuComponent } from './pages/mainmenu/mainmenu.component';
import { PanelControlComponent } from './pages/panel-control/panel-control.component';
import { LoginComponent } from './login/login.component';
import { AltaUsuariosComponent } from './pages/alta-usuarios/alta-usuarios.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'mainmenu', component: MainmenuComponent},
    {path: 'panel-control', component: PanelControlComponent},
    {path: 'alta-usuarios', component: AltaUsuariosComponent}
];
