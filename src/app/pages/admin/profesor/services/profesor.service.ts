import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProfesorService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get("/profesor");
  }

  create(data: any) {
    return this.http.post("/profesor", data);
  }

  edit(data: any) {
    return this.http.patch("/profesor", data);
  }

  deleteProfesor(id: number) {
    return this.http.put("/profesor", { id });
  }
}
