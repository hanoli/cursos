import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UploadService } from 'src/app/services/upload.service';
import { CommonFormComponent } from '../common-form.component';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  extends CommonFormComponent<Alumno, UploadService> implements OnInit{

  private fotoSeleccionada: File;

  constructor(service: UploadService, router: Router,
    route: ActivatedRoute) {
      super(service, router, route);
     }

  ngOnInit(): void {
  }

  public carga(): void {
    if(!this.fotoSeleccionada){
      super.cargar();
    } else {
      this.service.cargarArchivo(this.fotoSeleccionada)
      .subscribe(alumno => {
        console.log(alumno);
       Swal.fire('Nuevo:', `Archivo cargado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      });
    
  }
}

public seleccionarFoto(event): void {
  this.fotoSeleccionada = event.target.files[0];
  console.info(this.fotoSeleccionada);

  /*if(this.fotoSeleccionada.type.indexOf('image') < 0){
    this.fotoSeleccionada = null;
    Swal.fire(
      'Error al seleccionar la foto:', 
      'El archivo debe ser del tipo imagen',
      'error');
  }*/
}



}
