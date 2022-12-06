import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LandingRoutingModule } from "./landing-routing.module";

import { MainComponent } from "./components/main/main.component";

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}
