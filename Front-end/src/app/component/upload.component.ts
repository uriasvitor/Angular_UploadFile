import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  progress:number = 0;
  chosenFile?: any;
  file:File | null = null;
  private subscription : Subscription |  undefined;

  constructor() { }

  ngOnInit(): void {}

  public onFileInput(files: FileList | null):void{
    if(files){
      this.file = files.item(0)
      console.log("passou no files",this.file)
    }
  }

  public upload():void{

    this.progress = 0;
    this.chosenFile = this.file;
    if(HttpEventType.UploadProgress){
      this.progress = HttpEventType.DownloadProgress
      console.log(HttpEventType.UploadProgress)
    }
  }

  public onSubmit(){
    if(this.file){

    }

  }
}
