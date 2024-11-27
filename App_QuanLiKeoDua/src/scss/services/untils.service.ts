import { HostListener, Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private globalService : GlobalService) { }
//   toLowerCaseNonAccentVietnamese(str: string) {
//     str = str.toLowerCase();
// //     We can also use this instead of from line 11 to line 17
// //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
// //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
// //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
// //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
// //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
// //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
// //     str = str.replace(/\u0111/g, "d");
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     str = str.replace(/đ/g, "d");
//     // Some system encode vietnamese combining accent as individual utf-8 characters
//     str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
//     str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
//     return str;
// }

// This function keeps the casing unchanged for str, then perform the conversion
toNonAccentVietnamese(str: string) {
      str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/Đ/g, "D");
      str = str.replace(/đ/g, "d");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
      return str;
  }
  toLowerCaseNonAccentVietnamese(str: string): string {
    str = str.toLowerCase();

    // Define replacement arrays for vowels with diacritics
    const accentsMap: { [key: string]: string } = {
        'a': 'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ',
        'e': 'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ',
        'i': 'ì|í|ị|ỉ|ĩ',
        'o': 'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ',
        'u': 'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ',
        'y': 'ỳ|ý|ỵ|ỷ|ỹ',
        'd': 'đ',
    };

    for (let nonAccent in accentsMap) {
        const accentPattern = new RegExp(accentsMap[nonAccent], 'g');
        str = str.replace(accentPattern, nonAccent);
    }

    // Remove combining diacritical marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

    return str;
  }
   
  OnLoadpage() {
    const el = document.getElementById('PageLoading')
    if(el) el.style.display='block';  
  }
  OnLoadpageBg() {
    const el = document.getElementById('PageLoading')
    el?.classList.add('bg-2');
    if(el) el.style.display='block';  
  }
  OffLoadpage() {
    const el = document.getElementById('PageLoading');
    if(el) el.style.display = "none";
    el?.classList.remove('bg-2');

  }

  DateAdd(date:Date, days : number) : Date{
    const dateValue = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    dateValue.setHours(0,1);
    return dateValue;
  }

  getToDate(days : number=3) : Date{
    const timenowValue = new Date().getTime();
    const dateValue = new Date(timenowValue + days * 24 * 60 * 60 * 1000);
    dateValue.setHours(23,59)
    return dateValue;
  }
 //set giờ phút
  SetTimeToDate(date: Date, hours: number, minutes: number): Date {
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes, 0, 0); // Giờ, phút, giây, và milliseconds
    return updatedDate;
  }
  //Hàm làm tròn
  // value: số cần làm tròn
  // place: số bậc làm tròn. -3: hàng nghìn, -4: chục nghìn, 1: 1 số lẻ thập phân, 2: 2 số lẻ
  round(value: number, place: number): number{
    place = -place;
    const factor = Math.pow(10, place);
    const roundedNumber = Math.round(value / factor) * factor
    // Nếu số đã làm tròn là một số nguyên, trả về số nguyên đó
    if (roundedNumber % 1 === 0) {
      return Math.round(roundedNumber);
  }
    return roundedNumber;
  }

  changeTaxRate(taxId: number): number{
    if(taxId ==1 || taxId == 2)
      return 0;
    else if(taxId==3)
      return 5;
    else if(taxId == 4)
      return 10;
    else if(taxId == 6)
      return 8;
    else 
      return 0;
  }

  deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      const arrCopy = [] as any[];
      for (const item of obj) {
        arrCopy.push(this.deepCopy(item));
      }
      return arrCopy as unknown as T;
    }
  
    const objCopy = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        (objCopy as any)[key] = this.deepCopy((obj as any)[key]);
      }
    }
    return objCopy;
  }

  makeEmpty<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    const emptyObj = {} as T;
    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'string') {
              if(guidPattern.test(value)){
                emptyObj[key] = this.GuidEmpty() as any;
              }else{
                emptyObj[key] = null as any;
              }
                
            } else if (typeof value === 'number') {
                emptyObj[key] = 0 as any;
            } else if (typeof value === 'boolean') {
                emptyObj[key] = false as any;
            } else if (Array.isArray(value)) {
                emptyObj[key] = [] as any;
            } else if (typeof value === 'object' && value !== null) {
                emptyObj[key] = this.makeEmpty(value);
            } else {
                emptyObj[key] = null as any;
            }
        }
    }
    return emptyObj;
}

  GuidEmpty():string {
    return '00000000-0000-0000-0000-000000000000'
  }

  newGuid(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  changeDateToDateText(printDate:Date):string {
    return "Ngày " + printDate.getDate() + " tháng " + (printDate.getMonth() + 1) + " năm " + printDate.getFullYear();
  }
  
  formatNumber00(number:any):string {
    var result = number;
    if (number < 10)
        result = '0' + number;
    return result;
  };

  truncTime(date:Date) :Date{
    var dateTmp = new Date(date);

    return new Date(dateTmp.getFullYear(), dateTmp.getMonth(), dateTmp.getDate(), 0, 0, 0);
};
//****************Cắt bỏ giờ trong ngày => Chuyển về 0:0:0**************//

  compareDate(d1:Date, d2:Date, isIncludeTime:boolean) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    if ((!date1 && date2) || (date1 && !date2))
        return false;
    if (date1.getFullYear() != date2.getFullYear())
        return false;
    if (date1.getMonth() != date2.getMonth())
        return false;
    if (date1.getDate() != date2.getDate())
        return false;
    if (isIncludeTime) {
        if (date1.getHours() != date2.getHours())
            return false;
        if (date1.getMinutes() != date2.getMinutes())
            return false;
    }
    return true;
  };
  
  //FileUpload Function

}
