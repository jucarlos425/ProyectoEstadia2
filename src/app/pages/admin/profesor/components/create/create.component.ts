import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfesorService } from "../../services/profesor.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  @Output() close = new EventEmitter();
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private profesorSrv: ProfesorService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.validateForm = this.fb.group({
      nombre: [null, [Validators.required]],
      apellidoPaterno: [null, [Validators.required]],
      apellidoMaterno: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.profesorSrv.create(this.validateForm.value).subscribe();

    this.closeDrawer();
  }

  closeDrawer() {
    this.close.emit();
  }
}
