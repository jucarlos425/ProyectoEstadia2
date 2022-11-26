import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizatedGuard } from './core/guard/authorizated.guard';
import { NoAuthorizatedGuard } from './core/guard/no-authorizated.guard';

import { AdminComponent } from './layout/admin/admin.component';
import { BlankComponent } from './layout/blank/blank.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  // Landing page
  {
    path: '',
    component: LandingComponent,
    canActivate: [NoAuthorizatedGuard],
    canActivateChild: [NoAuthorizatedGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/landing/landing.module').then((m) => m.LandingModule),
      },
    ],
  },

  // Auth routes
  {
    path: 'auth',
    component: BlankComponent,
    canActivate: [NoAuthorizatedGuard],
    canActivateChild: [NoAuthorizatedGuard],
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'logout',
        loadChildren: () =>
          import('./pages/auth/logout/logout.module').then(
            (m) => m.LogoutModule
          ),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },

  // Admin routes
  {
    path: 'admin',
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
    component: AdminComponent,
    children: [
      //* Dashboard
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      //* Alumnos
      {
        path: 'alumno',
        loadChildren: () =>
          import('./pages/admin/alumno/alumno.module').then(
            (m) => m.AlumnoModule
          ),
      },
      //* Profesores
      {
        path: 'profesor',
        loadChildren: () =>
          import('./pages/admin/profesor/profesor.module').then(
            (m) => m.ProfesorModule
          ),
      },
      //* Solicitudes
      {
        path: 'solicitud',
        loadChildren: () =>
          import('./pages/admin/solicitud/solicitud.module').then(
            (m) => m.SolicitudModule
          ),
      },
      //* Turores
      {
        path: 'tutor',
        loadChildren: () =>
          import('./pages/admin/tutor/tutor.module').then((m) => m.TutorModule),
      },
      //* Usuarios
      {
        path: 'usuario',
        loadChildren: () =>
          import('./pages/admin/usuario/usuario.module').then(
            (m) => m.UsuarioModule
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },

  //* 404
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
