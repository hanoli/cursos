import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';
import { BASE_ENDPOINT } from '../config/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno>{

 // protected baseEndpoint = BASE_ENDPOINT;

  constructor(http: HttpClient) {
    super(http);
   }

   public crearConFoto(file: File): Observable<any>{
     const formData = new FormData();
     formData.append('file', file);
     /*formData.append('nombre', alumno.nombre);
     formData.append('apellido', alumno.apellido);
     formData.append('email', alumno.email);*/
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

   public editarConFoto(alumno: Alumno, archivo: File): Observable<Alumno>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.http.put<Alumno>(`${this.baseEndpoint}/editar-con-foto/${alumno.id}`,
     formData);
  }
}
