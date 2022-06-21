import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'sizeValue'})
export class sizePipe implements PipeTransform{
  transform(value: number):string {
    return(value/(1024*1024)).toFixed(2)+'mb'
  }

}
