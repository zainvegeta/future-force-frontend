import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  postMessage(data: any): Observable<any> {
    return this.http
      .post('api/messages', { data: data })
      .pipe(catchError(this.handleError));
  }

  postResume(data: any): Observable<any> {
    return this.http
      .post('api/resumes', { data: data })
      .pipe(catchError(this.handleError));
  }

  postGrievance(data: any): Observable<any> {
    return this.http
      .post('api/grievances', { data: data })
      .pipe(catchError(this.handleError));
  }

  getCategories(page: number = 1, pageSize: number = 100): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('pagination[page]', page)
        .set('pagination[pageSize]', pageSize)
        .set('sort[0]', 'id:desc')
        .set('fields[0]', 'name')
        .set('populate[jobs][count]', 'true'),
    };
    return this.http
      .get('api/categories', options)
      .pipe(catchError(this.handleError));
  }

  getFeaturedCategories(): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('pagination[page]', 1)
        .set('pagination[pageSize]', 6)
        .set('sort[0]', 'id:desc')
        .set('fields[0]', 'name')
        .set('populate', 'image')
        .set('filters[featured][=]', 'true'),
    };
    return this.http
      .get('api/categories', options)
      .pipe(catchError(this.handleError));
  }

  getCountries(page: number = 1, pageSize: number = 100): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('pagination[page]', page)
        .set('pagination[pageSize]', pageSize)
        .set('sort[0]', 'id:desc')
        .set('fields[0]', 'name')
        .set('populate[jobs][count]', 'true'),
    };
    return this.http
      .get('api/countries', options)
      .pipe(catchError(this.handleError));
  }

  getJobs(
    page: number = 1,
    pageSize: number = 100,
    countryId: number = 0,
    categoryId: number = 0,
    query:string=''
  ): Observable<any> {

    let params = new HttpParams()
    .set('pagination[page]', page)
    .set('pagination[pageSize]', pageSize)
    .set('sort[0]', 'id:desc')
    .set('populate', '*');

    if (countryId > 0) {
      params=params.set('filters[$and][0][countries][id][$eq]', countryId)
    }
    if (categoryId > 0) {
      params=params.set('filters[$and][1][categories][id][$eq]', categoryId)
    }
    if(query!=''){
      params=params.set('filters[$and][2][title][$containsi]', query)
    }
  
    const options = {
      params: params
    };
    return this.http
      .get('api/jobs', options)
      .pipe(catchError(this.handleError));
  }

  getFeaturedJobs(): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('pagination[page]', 1)
        .set('pagination[pageSize]', 6)
        .set('sort[0]', 'id:desc')
        .set('filters[featured][=]', 'true'),
    };
    return this.http
      .get('api/jobs', options)
      .pipe(catchError(this.handleError));
  }

  getJob(id: number = 1): Observable<any> {
    const options = {
      params: new HttpParams().set('populate', '*'),
    };
    return this.http
      .get(`api/jobs/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http
      .post('api/upload', data)
      .pipe(catchError(this.handleError));
  }

  validateRecaptcha(token:string): Observable<any>{
    const options = {
      params: new HttpParams().set('token', token),
    };
    return this.http
      .get(`api/recaptcha/validateToken`, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
