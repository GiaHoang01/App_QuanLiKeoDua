import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private globalService : GlobalService) { }

  DateAdd(date:Date, days : number) : Date{
    const dateValue = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    dateValue.setHours(0,1);
    return dateValue;
  }
  getToDate() : Date{
    const timenowValue = new Date().getTime();
    const dateValue = new Date(timenowValue + 1 * 24 * 60 * 60 * 1000);
    dateValue.setHours(23,59)
    return dateValue;
  }
 //set giờ phút
  SetTimeToDate(date: Date, hours: number, minutes: number): Date {
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes, 0, 0); // Giờ, phút, giây, và milliseconds
    return updatedDate;
  }
}
