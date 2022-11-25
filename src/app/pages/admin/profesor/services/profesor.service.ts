import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) {}

  getAll() {
  	return this.http.get("/profesor")
  }
  
  deleteProfesor(id:number) {
    return this.http.put("/profesor",{id})
  }
}
