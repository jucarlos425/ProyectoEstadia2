import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../services/tutor.service';
import { TutorInterface } from '../../interfaces/tutor';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private tutorService: TutorService, private drawerService: NzDrawerService) { }

  dataSet: TutorInterface[] = []
  drawerRef : NzDrawerRef

  ngOnInit(): void {
  this.getData()
  }

  getData(): void {
  	this.tutorService.getAll().subscribe(
  		resp => this.dataSet = resp["data"],
  		error => console.error('error al obtener los tutores.', error)
  	)
  }
  
  openDrawer(content:any, title:string, data:TutorInterface): void {
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
  this.tutorService.deleteTutor(id).subscribe()
}

}

