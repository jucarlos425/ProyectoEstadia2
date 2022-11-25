import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioInterface } from '../../interfaces/usuario';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private drawerService: NzDrawerService) { }

  dataSet: UsuarioInterface[] = []
  drawerRef : NzDrawerRef

  ngOnInit(): void {
  this.getData()
  }

  getData(): void {
  	this.usuarioService.getAll().subscribe(
  		resp => this.dataSet = resp["data"],
  		error => console.error('error al obtener los usuarios.', error)
  	)
  }
  
  openDrawer(content:any, title:string, data:UsuarioInterface): void {
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
  this.usuarioService.deleteUsuario(id).subscribe()
}

}