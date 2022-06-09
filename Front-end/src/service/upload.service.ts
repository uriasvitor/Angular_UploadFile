import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})

export class uploadService{
    constructor(private http: HttpClient){}

    upload(file: File): Observable<void>{
      const data = new FormData()
      data.append('file',file)
    }

}
