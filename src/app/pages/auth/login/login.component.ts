import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../core/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  currentYear = new Date().getFullYear();
  url = environment.URL;
  helper = new JwtHelperService();

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _httpClient: HttpClient,
    private notification: NzNotificationService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this._httpClient.post("/login", this.validateForm.value).subscribe({
        next: (res) => this.successPost(res),
        error: (err) => this.errorPost(err),
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  successPost(res: any) {
    this.helper.decodeToken(res["access_token"]);
    this._authService.signIn(res["access_token"]);
    this._router.navigateByUrl("admin/landing");
    const redirectURL =
      this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
      "admin/landing";
    console.debug(redirectURL);
    this._router.navigateByUrl("admin/landing");
  }

  errorPost(err: any) {
    console.debug(err);
  }
}
