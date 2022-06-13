import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn:'root'
})
export class uploadService{
    constructor(private http: HttpClient){}

    uploadFile(file: File): Observable<HttpEvent<any>> {
      const data: FormData = new FormData();
      data.append('file', file);

      const request = new HttpRequest('POST', `${API_URL}/upload-file`, data, {
        reportProgress: true,
        responseType: 'json'
      });

      return this.http.request(request);
    }

    getFiles(): Observable<any> {
      return this.http.get(`${API_URL}/files`);
    }

}
