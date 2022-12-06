import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlumnoService } from "../../services/alumno.service";
import { AlumnoInterface } from "../../interfaces/alumno";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  @Input()
  data!: AlumnoInterface;
  @Output() close = new EventEmitter();
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private alumnoSrv: AlumnoService) {}

  ngOnInit(): void {
    this.createForm(this.data);
  }
  createForm(data: AlumnoInterface) {
    this.validateForm = this.fb.group({
      id: [data.id, [Validators.required]],
      nombre: [data.nombre, [Validators.required]],
      apellidoPaterno: [data.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [data.apellidoMaterno, [Validators.required]],
      cuatrimestre: [data.cuatrimestre, [Validators.required]],
      carrera: [data.carrera, [Validators.required]],
      matricula: [data.matricula, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.alumnoSrv.edit(this.validateForm.value).subscribe();

    this.closeDrawer();
  }

  closeDrawer() {
    this.close.emit();
  }
}
