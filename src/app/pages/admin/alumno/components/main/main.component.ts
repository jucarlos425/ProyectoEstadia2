import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoInterface } from '../../interfaces/alumno';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private alumnoService: AlumnoService, private drawerService: NzDrawerService) { }

  dataSet: AlumnoInterface[] = []
  drawerRef : NzDrawerRef

  ngOnInit(): void {
  this.getData()
  }

  getData(): void {
  	this.alumnoService.getAll().subscribe(
  		resp => this.dataSet = resp["data"],
  		error => console.error('error al obtener los alumnos.', error)
  	)
  }
  
  openDrawer(content:any, title:string, data:AlumnoInterface): void {
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
  this.alumnoService.deleteAlumno(id).subscribe()
}

}
