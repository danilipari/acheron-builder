import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(public spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let lastResponse: HttpEvent<any>;
    let error: HttpErrorResponse;
    this.totalRequests++;
    this.spinnerService.show();

    return next.handle(req).pipe(
      tap((res) => {
        lastResponse = res;
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError((err) => {
        error = err;
        this.decreaseRequests();
        return throwError(err);
      }),
      finalize(() => {
        if (lastResponse.type === HttpEventType.Sent && !error) {
          this.decreaseRequests();
        }
      })
    );
  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.spinnerService.hide();
    }
  }
}
