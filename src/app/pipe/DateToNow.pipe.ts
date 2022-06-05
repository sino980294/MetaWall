import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateToNow'
})
export class DateToNowPipe implements PipeTransform {

  transform(value: Date): number|string {
    if(value){

      const now = new Date();
      const different = now.getTime() - new  Date(value).getTime();
      return (different /(1000 * 3600 * 24)).toFixed(0)
    }else{
      return '';
    }



  }

}
