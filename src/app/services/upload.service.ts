import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams,HttpRequest } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';
import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends CommonService<Alumno> {
  
  constructor(http: HttpClient) {
    super(http);
   }

   public cargarArchivo(file: File): Observable<any>{
     const formData = new FormData();
     formData.append('file', file);
    // return this.http.post<Alumno>( BASE_ENDPOINT + '/upload',formData);
    //return this.http.post<any>( environment.urlBase + `/upload`,formData);
     const req = new HttpRequest('POST', BASE_ENDPOINT + `/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    /*return this.http.post<Alumno>( BASE_ENDPOINT + '/upload',formData, {
      reportProgress: true,
      responseType: 'json'
    });*/

    return this.http.request(req);
   }

}
