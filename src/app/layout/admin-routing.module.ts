import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
  {
    path: "landing",
    component: AdminComponent,
    loadChildren: () =>
      import("../pages/admin/landing/landing.module").then(
        (m) => m.LandingModule
      ),
  },
  {
    path: "alumno",
    component: AdminComponent,
    loadChildren: () =>
      import("../pages/admin/alumno/alumno.module").then((m) => m.AlumnoModule),
  },
  {
    path: "profesor",
    component: AdminComponent,
    loadChildren: () =>
      import("../pages/admin/profesor/profesor.module").then(
        (m) => m.ProfesorModule
      ),
  },
  {
    path: "solicitud",
    component: AdminComponent,
    loadChildren: () =>
      import("../pages/admin/solicitud/solicitud.module").then(
        (m) => m.SolicitudModule
      ),
  },
  {
    path: "tutor",
    component: AdminComponent,
    loadChildren: () =>
      import("../pages/admin/tutor/tutor.module").then((m) => m.TutorModule),
  },
  {
    path: "usuario",
    component: AdminComponent,
    loadChildren: () =>
      import("../pages/admin/usuario/usuario.module").then(
        (m) => m.UsuarioModule
      ),
  },

  //* 404
  {
    path: "**",
    redirectTo: "landing",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
