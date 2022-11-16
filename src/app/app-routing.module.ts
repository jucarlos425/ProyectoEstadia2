import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthorizatedGuard } from './core/guard/authorizated.guard';
const routes: Routes = [
  {
    //* Alumnos
    path: '',
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
    component: AdminComponent,
    children: [
      {
        path: 'alumno',
        loadChildren: () =>
          import('./pages/admin/alumno/alumno.module').then(
            (m) => m.AlumnoModule
          ),
      },
    ],
  },

  //* Profesores
  {
    path: '',
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
    component: AdminComponent,
    children: [
      {
        path: 'profesor',
        loadChildren: () =>
          import('./pages/admin/profesor/profesor.module').then(
            (m) => m.ProfesorModule
          ),
      },
    ],
  },
  {
    //* Solicitudes
    path: '',
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
    component: AdminComponent,
    children: [
      {
        path: 'solicitud',
        loadChildren: () =>
          import('./pages/admin/solicitud/solicitud.module').then(
            (m) => m.SolicitudModule
          ),
      },
    ],
  },
  {
    //* Tutores
    path: '',
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
    component: AdminComponent,
    children: [
      {
        path: 'tutor',
        loadChildren: () =>
          import('./pages/admin/tutor/tutor.module').then((m) => m.TutorModule),
      },
    ],
  },
  {
    //* Usuarios
    path: '',
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
    component: AdminComponent,
    children: [
      {
        path: 'usuario',
        loadChildren: () =>
          import('./pages/admin/usuario/usuario.module').then(
            (m) => m.UsuarioModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
