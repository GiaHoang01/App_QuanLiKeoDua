import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { GlobalService } from '../../../scss/services/global.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginatorModule, CommonModule,FormsModule, SelectModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  first: number = 0;
  pageIndex: number;
  pageSize: number;
  isReSearch = true;

  @Input() totalRows!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  @Output() selectRowsEvent = new EventEmitter<number>();

  options = [
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
  ];

  constructor(private globalService: GlobalService) {
    this.pageIndex = this.globalService.paging.PageIndex;
    this.pageSize = this.globalService.paging.PageSize;
  }

  onPageChange(event: PaginatorState) {
    this.pageIndex = event.page !== undefined ? event.page + 1 : 1;
    this.globalService.paging.PageIndex = this.pageIndex;
    this.selectPageEvent.emit(this.pageIndex);
  }

  onRowsChange() {
    this.isReSearch = false;
    this.globalService.paging.PageSize = this.pageSize;
    this.selectRowsEvent.emit(this.pageSize);
    setTimeout(() => {
      this.isReSearch = true;
    }, 1);
  }
}
