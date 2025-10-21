import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, throwError } from "rxjs";


export const handlingErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messagingService = inject(MessageService);


  return next(req).pipe(
    catchError((error) => {

      
      let errBody: any = error.error;

      try {
        // 
        if (typeof errBody === 'string') {
          errBody = JSON.parse(errBody);
        }
      } catch {
        //
      }

      const status = error.status || errBody?.statusCode;

      // -------------------------
      // 
      // -------------------------
      switch (status) {
        case 400:
          //

          if (errBody?.details) {
            const details =
              Array.isArray(errBody.details)
                ? errBody.details.map((d: any) => `${d.propertyName}: ${d.errorMessage}`).join(', ')
                : JSON.stringify(errBody.details);

            messagingService.add({
              key: 'tm',
              severity: 'error',
              summary: 'Validation Error',
              detail: details || errBody.message || 'Bad Request',
            });
          }


          else if (errBody.errors) {
            const errors = errBody.errors;
            for (const key in errors) {
              if (errors.hasOwnProperty(key)) {
                const fieldErrors = errors[key]; 
                fieldErrors.forEach((errorMsg: string) => {
                  messagingService.add({
                    key: 'tm',
                    severity: 'error',
                    summary: 'Validation Error',
                    detail: `${key}: ${errorMsg}`
                  });
                });
              }
            }

          }
          else {
            messagingService.add({
              key: 'tm',
              severity: 'error',
              summary: 'Bad Request',
              detail: errBody?.message || 'Invalid input data',
            });
          }
          break;

        case 401:
          messagingService.add({
            key: 'tm',
            severity: 'warn',
            summary: 'Unauthorized',
            detail: 'Unauthorized',
          });
          break;

        case 403:
          messagingService.add({
            key: 'tm',
            severity: 'warn',
            summary: 'Forbidden',
            detail: 'Forbidden',
          });
          break;

        case 404:
          messagingService.add({
            key: 'tm',
            severity: 'info',
            summary: 'Not Found',
            detail: 'Not Found',
          });
          break;

        case 500:
          messagingService.add({
            key: 'tm',
            severity: 'error',
            summary: 'Server Error',
            detail: errBody?.message || 'Server Error',
          });
          break;

        default:
          messagingService.add({
            key: 'tm',
            severity: 'error',
            summary: 'Unexpected Error',
            detail:
              errBody?.message || 'Unexpected Error',
          });
          break;
      }

      // -------------------------
      // 
      // -------------------------
      return throwError(() => error);





    })
  )

}