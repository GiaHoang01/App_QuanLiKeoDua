import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Directive({
  selector: '[appFormatDate]',
  standalone: true
})
export class FormatDateDirective implements OnChanges {
  @Input() appFormatDate: string | Date | null = null;
  @Input() format: 'dateFilter' | 'timeFilter' |  'timeSecondFilter' |'dateTimeFilter' = 'dateFilter'; // Default format

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appFormatDate']) {
      this.updateDate();
    }
  }

  // Example
  // <span [appFormatDate]="'2024-08-13T09:50:57.753'" format="dateTimeFilter"></span><br/>
  // <span [appFormatDate]="'2024-08-13T09:50:57.753'" format="timeFilter"></span><br/>
  // <span [appFormatDate]="'2024-08-13T09:50:57.753'" format="dateFilter"></span><br/>

  private updateDate(): void {
    if (this.appFormatDate) {
      const date = new Date(this.appFormatDate);
      let formatString: string;

      switch (this.format) {
        case 'dateFilter':
          formatString = 'dd/MM/yyyy'; // Custom date format
          break;
        case 'timeFilter':
          formatString = 'HH:mm'; // Custom time format
          break;
          case 'timeSecondFilter':
            formatString = 'HH:mm:ss'; // Custom time format
            break;
        case 'dateTimeFilter':
          formatString = 'dd/MM/yyyy HH:mm'; // Custom date and time format
          break;
        default:
          formatString = 'short'; // Default format
      }

      const formattedDate = formatDate(date, formatString, 'en-US');
      this.el.nativeElement.textContent = formattedDate;
    }
  }
}
