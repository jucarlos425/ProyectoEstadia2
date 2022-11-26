import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AdminComponent } from './admin/admin.component';
import { BlankComponent } from './blank/blank.component';


@NgModule({
  declarations: [
    AdminComponent,
    BlankComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
