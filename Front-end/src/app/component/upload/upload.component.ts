import { uploadService } from 'src/app/service/upload.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit{
  form: FormGroup;
  notfound = false
  progress: number = 0;
  info:string = '';

  information = [
    'Nenhum arquivo selecionado',
    'Enviado com SUCESSO!'
  ]

  constructor(
    public fb: FormBuilder,
    public fileUploadService: uploadService
  ) {
    this.form = this.fb.group({
      archive: [null]
    })
  }

  ngOnInit() { }
  uploadFile(event:any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      archive: file
    });
    this.form.get('archive')?.updateValueAndValidity()
    this.notfound = false;
  }

  submitFile() {
    this.fileUploadService.postFile(
      this.form.value.archive
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / (event.total!) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
          case HttpEventType.Response:
            console.log('successfully!', event.body);

            setTimeout(() => {
              this.progress = 0;
            }, 1500);
          }
          console.log(this.form.value.archive)
          if(this.form.value.archive == undefined){
            this.information[0];
            this.notfound = true
          }
        })
  }
}
