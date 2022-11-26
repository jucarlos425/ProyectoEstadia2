import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) {}

  getAll() {
  	return this.http.get("/solicitud")
  }
  
  deleteSolicitud(id:number) {
    return this.http.put("/solicitud",{id})
  }
}