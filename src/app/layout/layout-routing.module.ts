import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizatedGuard } from '../core/guard/authorizated.guard';
import { NoAuthorizatedGuard } from '../core/guard/no-authorizated.guard';

import { AdminComponent } from './admin/admin.component';
import { BlankComponent } from './blank/blank.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    canActivate: [NoAuthorizatedGuard],
    canActivateChild: [NoAuthorizatedGuard],
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthorizatedGuard],
    canActivateChild: [AuthorizatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
