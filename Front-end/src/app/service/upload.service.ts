import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})
export class uploadService{
  env = environment.API_URL;

  constructor(private http: HttpClient) {}
  postFile(profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('archive', profileImage);
    return this.http
      .post(`${this.env}`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.env}`);
  }

}
