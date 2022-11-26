import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) {}

  getAll() {
  	return this.http.get("/tutor")
  }
  
  deleteTutor(id:number) {
    return this.http.put("/tutor",{id})
  }
}