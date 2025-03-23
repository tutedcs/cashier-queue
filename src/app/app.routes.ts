import { Routes } from '@angular/router';
import { MainmenuComponent } from './pages/mainmenu/mainmenu.component';
import { PanelControlComponent } from './pages/panel-control/panel-control.component';

export const routes: Routes = [
    {path: '', redirectTo: 'mainmenu', pathMatch: 'full'},
    {path: 'mainmenu', component: MainmenuComponent},
    {path: 'panel-control', component: PanelControlComponent},
];
