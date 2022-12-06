import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { UsuarioInterface } from "../../interfaces/usuario";
import { NzDrawerRef, NzDrawerService } from "ng-zorro-antd/drawer";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  dataSet: UsuarioInterface[] = [];
  drawerRef!: NzDrawerRef;
  data!: UsuarioInterface;
  constructor(
    private usuarioService: UsuarioService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.usuarioService.getAll().subscribe(
      (data: any) => {
        this.dataSet = data["data"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe();
    this.getData();
  }

  openDrawer(content: any, title: string, data: any) {
    this.data = data;
    this.drawerRef = this.drawerService.create({
      nzTitle: title,
      nzContent: content,
      nzWidth: "70vw",
      nzClosable: false,
    });

    this.drawerRef.afterClose.subscribe(() => {
      this.getData();
    });
  }

  close(e: any) {
    this.drawerRef.close();
  }
}
