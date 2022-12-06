import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SolicitudService } from "../../services/solicitud.service";
import { SolicitudInterface } from "../../interfaces/solicitud";
import { NzDrawerRef, NzDrawerService } from "ng-zorro-antd/drawer";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  dataSet: SolicitudInterface[] = [];
  drawerRef!: NzDrawerRef;
  data!: SolicitudInterface;
  constructor(
    private solicitudService: SolicitudService,
    private drawerSrv: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.solicitudService.getAll().subscribe(
      (data: any) => {
        this.dataSet = data["data"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.solicitudService.deleteSolicitud(id).subscribe();
    this.getData();
  }

  openDrawer(content: any, title: string, data: any) {
    this.data = data;
    this.drawerRef = this.drawerSrv.create({
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
