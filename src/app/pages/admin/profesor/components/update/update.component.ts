import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfesorService } from "../../services/profesor.service";
import { ProfesorInterface } from "../../interfaces/profesor";
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  @Input()
  data!: ProfesorInterface;
  @Output() close = new EventEmitter();
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private profesorSrv: ProfesorService) {}

  ngOnInit(): void {
    this.createForm(this.data);
  }
  createForm(data: ProfesorInterface) {
    this.validateForm = this.fb.group({
      id: [data.id, [Validators.required]],
      nombre: [data.nombre, [Validators.required]],
      apellidoPaterno: [data.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [data.apellidoMaterno, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.profesorSrv.edit(this.validateForm.value).subscribe();

    this.closeDrawer();
  }

  closeDrawer() {
    this.close.emit();
  }
}
