import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
    headers: req.headers
      .set('Authorization', `Bearer ${environment.apiToken}`),
  });
  return next(req);
};
