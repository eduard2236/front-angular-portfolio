import { ModuleWithProviders } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from "./components/edit/edit.component";
import { IndexComponent } from "./components/index/index.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { AuthenticateGuard } from "./authenticate.guard";

const appRoutes: Routes = [
    /* {path: '/auth' , pathMatch: 'full'}, */
    {path: 'registro', component: RegisterComponent},
    {path: 'auth', component: LoginComponent},
    {path: '', component: AboutComponent},
    {path: 'inicio',component: IndexComponent},
    {path: 'sobre-mi', component: AboutComponent},
    {path: 'proyectos', component: ProjectsComponent},
    {path: 'crear-proyectos',component: CreateComponent, canActivate:[AuthenticateGuard]},
    {path: 'contacto', component: ContactComponent},
    {path: 'proyecto/:id',component: DetailComponent},
    {path: 'editar-proyecto/:id',component: EditComponent,canActivate:[AuthenticateGuard] },
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);