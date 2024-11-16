import { CommonModule, NgIf,NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, BsLocaleService, DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { defineLocale, listLocales } from 'ngx-bootstrap/chronos';
import { viLocale } from 'ngx-bootstrap/locale';
// Định nghĩa locale cho tiếng Việt
defineLocale('vi', viLocale);

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [FormsModule,BsDatepickerModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatePickerComponent implements OnInit{
  @Input() isShowTime!:boolean;
  @Input() dateValue!:Date | string;
  @Input() isShowTodayBtn:boolean = false;
  @Input() isShowWeek:boolean = false;
  @Input() inputClass!:string;
  @Input() isDisabled!:string|boolean;
  @Input() adaptivePosition:boolean = true;
  @Input() placement : 'top' | 'bottom' | 'left' | 'right' = 'bottom';  
  @Output() dateValueChange = new EventEmitter<Date>();
  now = new Date();
  @Input() format = 'DD/MM/YYYY';
  @Input() name:string = '';
  locale = 'vi';
  locales = listLocales();
  dateCustomClasses!: DatepickerDateCustomClasses[];
  lastDate!:Date;
  startSelect:boolean = false;

  constructor(private localeService: BsLocaleService) {
    
    this.localeService.use(this.locale);
    this.dateCustomClasses = [
      { date: this.now, classes: ['bg-primary'] }
    ];
  }

  
  ngOnInit() {}
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dateValue']) {
      const dateValue = this.dateValue;
      if (typeof dateValue === 'string' || dateValue == null) {
        const parsedDate = new Date(dateValue);
        if (!isNaN(parsedDate.getTime())) {
          this.dateValue = parsedDate;
          this.lastDate = this.dateValue;
        } else {
          console.error('Invalid date string:', dateValue);
          // Xử lý trường hợp ngày không hợp lệ
        }
      }
    }
    
  }

  onSelectDate() {
    if(isNaN(new Date(this.dateValue).getTime())){
      this.dateValue = new Date(this.lastDate);
    }else{
      this.lastDate = new Date(this.dateValue);
    }
    if (typeof this.dateValue === 'string') {
      // Chuyển đổi từ ISO string thành Date
      this.dateValueChange.emit(new Date(this.dateValue));
    } else if (this.dateValue instanceof Date) {
      // Nếu dateValue là đối tượng Date, phát emit trực tiếp
      this.dateValueChange.emit(this.dateValue);
    }
    this.startSelect = false; 
  }

  validateInput(event: KeyboardEvent): void {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', ':'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}