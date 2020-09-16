import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class Utility {

  constructor(
    private datePipe: DatePipe
  ) {}

  transformTimeFormat(timestamp: string) {
    return this.datePipe.transform(timestamp, 'HH:mm'); //12:00
  }

  convertInMin(sec: number) {
    return parseInt((sec/60).toPrecision(2));
  }

}
