import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./components/main/main.component";
import { CreateComponent } from "./components/create/create.component";
import { UpdateComponent } from "./components/update/update.component";
import { RouterModule, Routes } from "@angular/router";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzButtonModule } from "ng-zorro-antd/button";

const routes: Routes = [{ path: "", component: MainComponent }];

@NgModule({
  declarations: [MainComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
  ],
})
export class ProfesorModule {}
