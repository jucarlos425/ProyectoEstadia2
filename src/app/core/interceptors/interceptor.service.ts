import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  url = environment.URL;
  constructor(
    private AuthService: AuthService,
    private notification: NzNotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let request = req.clone({
      url: this.url + req.url,
      setHeaders: {
        Authorization: `Bearer ${this.AuthService.getToken()}`,
      },
    });

    return next.handle(request).pipe(
      map((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          if (request.method != 'GET') {
            this.createNotification(
              'success',
              response.body.status,
              response.body.message
                ? response.body.message
                : 'Acción realizada con éxito'
            );
          }
        }
        return response;
      }),
      catchError((err) => {
        if (err['statusText'] !== 'Not Found') {
          this.createNotification('error', 0, err);
        }
        console.debug(err['statusText']);
        return throwError(() => new Error(err.toString()));
      })
    );
  }

  private createNotification(type: string, status?: any, message?: any): void {
    if (type == 'success')
      this.notification.create(type, `Éxito`, `${message}`);
    if (type == 'error')
      this.notification.create(
        type,
        `Error`,
        `${message.error.message ? message.error.message : message.error.error}`
      );
  }
}
