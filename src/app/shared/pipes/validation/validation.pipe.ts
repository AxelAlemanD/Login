import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation'
})
export class ValidationPipe implements PipeTransform {

  transform(errorMessages: any, controlDetails: { name: string, type: string }, controlErrors: object | null): unknown {
    const typeErrors = errorMessages[controlDetails.type];
    let errorToShow: string = typeErrors[Object.keys(controlErrors!)[0]];
    return (errorToShow.includes('INPUT_NAME')) 
      ? errorToShow.replace('INPUT_NAME', controlDetails.name) 
      : errorToShow;
  }
}