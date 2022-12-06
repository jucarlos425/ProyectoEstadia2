import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthorizatedGuard } from "./core/guard/authorizated.guard";
import { NoAuthorizatedGuard } from "./core/guard/no-authorizated.guard";

const routes: Routes = [
  //* Home Page
  {
    path: "",
    canActivate: [NoAuthorizatedGuard],
    canActivateChild: [NoAuthorizatedGuard],
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
  },

  //* Auth
  {
    path: "auth",
    canActivate: [NoAuthorizatedGuard],
    canActivateChild: [NoAuthorizatedGuard],
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
  },

  //* Admin
  {
    path: "admin",
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
    loadChildren: () =>
      import("./layout/admin.module").then((m) => m.AdminModule),
  },

  //* 404
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
