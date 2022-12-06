import { Component, OnInit } from "@angular/core";
import { AlumnoInterface } from "../../interfaces/alumno";
import { AlumnoService } from "../../services/alumno.service";
import { NzDrawerRef, NzDrawerService } from "ng-zorro-antd/drawer";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  dataSet: AlumnoInterface[] = [];
  drawerRef!: NzDrawerRef;
  data!: AlumnoInterface;
  constructor(
    private alumnoSrv: AlumnoService,
    private drawerSrv: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.alumnoSrv.getAll().subscribe(
      (data: any) => {
        this.dataSet = data["data"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.alumnoSrv.deleteAlumno(id).subscribe();
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
