import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SolicitudService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get("/solicitud");
  }

  create(data: any) {
    return this.http.post("/solicitud", data);
  }

  update(data: any) {
    return this.http.patch("/solicitud", data);
  }

  deleteSolicitud(id: number) {
    return this.http.put("/solicitud", { id });
  }
}
