import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) {}

  getAll() {
  	return this.http.get("/alumno")
  }
  
  deleteAlumno(id:number) {
    return this.http.put("/alumno",{id})
  }

}

