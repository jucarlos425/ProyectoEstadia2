import { Component, OnInit } from "@angular/core";
import { ProfesorService } from "../../services/profesor.service";
import { ProfesorInterface } from "../../interfaces/profesor";
import { NzDrawerRef, NzDrawerService } from "ng-zorro-antd/drawer";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  dataSet: ProfesorInterface[] = [];
  drawerRef!: NzDrawerRef;
  data!: ProfesorInterface;
  constructor(
    private profesorService: ProfesorService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.profesorService.getAll().subscribe(
      (data: any) => {
        this.dataSet = data["data"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.profesorService.deleteProfesor(id).subscribe();
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
