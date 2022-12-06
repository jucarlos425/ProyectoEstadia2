import { Component, OnInit } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { Router } from "@angular/router";
import { AuthService } from "../core/services/auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private modal: NzModalService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  warning(): void {
    this.modal.warning({
      nzTitle: "Cerrar sesión",
      nzContent: "¿Está seguro que desea cerrar sesión?",
      nzOkText: "Cerrar",
      nzOkType: "primary",
      nzOnOk: () => this.logOutUser(),
      nzCancelText: "Cancelar",
      // nzOnCancel: () => this.closeModal(),
    });
  }

  logOutUser(): void {
    this._authService.signOut();
    this._router.navigate(["/"]);
  }
}
