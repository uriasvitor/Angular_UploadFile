import { uploadService } from 'src/app/service/upload.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import data from '../../../assets/data.json'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit{
  form: FormGroup;
  progress: number = 0;
  info:any;
  resUpload:any = data;
  index:number = 0;

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
    this.info = file;
    this.index = 1;
    console.log(file)
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
              this.index = 2;
              this.progress = 0;
            }, 1500);
          }
          console.log(this.form.value.archive)
          if(this.form.value.archive == undefined){
            this.index = 2;
          }
        },(error)=>{
          this.index = 3;
        })
  }
}
