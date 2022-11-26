import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  getAll() {
  	return this.http.get("/usuario")
  }
  
  deleteUsuario(id:number) {
    return this.http.put("/usuario",{id})
  }
}