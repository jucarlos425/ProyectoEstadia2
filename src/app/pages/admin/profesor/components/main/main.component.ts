import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { ProfesorInterface } from '../../interfaces/profesor';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private profesorService: ProfesorService, private drawerService: NzDrawerService) { }

  dataSet: ProfesorInterface[] = []
  drawerRef : NzDrawerRef

  ngOnInit(): void {
  this.getData()
  }

  getData(): void {
  	this.profesorService.getAll().subscribe(
  		resp => this.dataSet = resp["data"],
  		error => console.error('error al obtener los profesores.', error)
  	)
  }
  
  openDrawer(content:any, title:string, data:ProfesorInterface): void {
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
  this.profesorService.deleteProfesor(id).subscribe()
}

}

