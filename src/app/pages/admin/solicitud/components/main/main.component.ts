import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudInterface } from '../../interfaces/solicitud';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private solicitudService: SolicitudService, private drawerService: NzDrawerService) { }

  dataSet: SolicitudInterface[] = []
  drawerRef : NzDrawerRef

  ngOnInit(): void {
  this.getData()
  }

  getData(): void {
  	this.solicitudService.getAll().subscribe(
  		resp => this.dataSet = resp["data"],
  		error => console.error('error al obtener las solicitudes.', error)
  	)
  }
  
  openDrawer(content:any, title:string, data:SolicitudInterface): void {
	 this.drawerRef = this.drawerService.create({
      nzContent: content,
      nzTitle: title,
      nzWidht: '70vw',
      nzClosable: false
   });
   this.drawerRef.afterClose.subscribe(() => this.getData());
 }

 closeDrawer() {
    this.drawerRef.close();
 }

delete(id:number): void {
  this.solicitudService.deleteSolicitud(id).subscribe()
}

}
