import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: any[] = [];  // Các options cho dropdown
  @Input() selected: any;         // Giá trị đã chọn
  @Output() optionChange = new EventEmitter<any>();  // EventEmitter để gửi giá trị khi chọn

  // Hàm gọi khi giá trị thay đổi (được sử dụng bởi ControlValueAccessor)
  onChange: (value: any) => void = () => {};

  // Hàm gọi khi input bị chạm (được sử dụng bởi ControlValueAccessor)
  onTouched: () => void = () => {};

  ngOnInit() {}

  // Thực hiện các phương thức của ControlValueAccessor
  writeValue(value: any): void {
    this.selected = value; // Ghi giá trị vào component
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn; // Đăng ký hàm thay đổi
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn; // Đăng ký hàm khi chạm
  }

  // Phương thức xử lý sự kiện thay đổi
  onChangeHandler(event: any) {
    this.selected = event.value; // Cập nhật giá trị đã chọn
    this.onChange(this.selected); // Gọi hàm onChange đã đăng ký
    this.optionChange.emit(this.selected); // Phát sự kiện thay đổi
  }
}
