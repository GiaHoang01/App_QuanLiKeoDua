import { Component, Input, Output, OnInit, inject, EventEmitter, HostListener, ViewChild, ElementRef, Renderer2, forwardRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PopoverModule } from 'primeng/popover';  // Import PopoverModule
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap, timeout } from 'rxjs';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { UtilsService } from '../../../scss/services/untils.service';

interface Column {
  field: string;
  header: string;
}

interface Type {
  value: string;
  color: any;
}

@Component({
  selector: 'app-quick-search',
  standalone: true,
  imports: [PopoverModule, CommonModule, TableModule, ToastModule, FormsModule, ConfirmDialogModule, ReactiveFormsModule],
  templateUrl: './app-quick-search.component.html',
  styleUrls: ['./app-quick-search.component.scss'],
  providers: [MessageService, ConfirmationService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppQuickSearchComponent),
    multi: true,
  }],
})

export class AppQuickSearchComponent implements OnInit, ControlValueAccessor {
  selectedCountryAdvanced: any[] | undefined;
  @Input() params!: string;
  @Input() name!: string;
  control!: FormControl;
  @Input() hearder: any[] = [];
  @Input() fields: any[] = [];
  @Input() styleField: any;
  @Input() styleList!: any[];
  @Input() inputClass!: string;
  @Input() required: boolean = false;
  @Input() inputStyle!: string;
  @Input() fieldShow!: string;
  @Input() outputField!: string;
  @Input() value: string | null = '';
  @Input() placeHolder: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isClearOnChoose: boolean = false;
  
  @Output() CallBackEvent = new EventEmitter<any>();
  @Output() extendFunctionEvent = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() selectedEvent = new EventEmitter<any>();

  @ViewChild('popover') popover: any; // Change to Popover reference
  @ViewChild('input') input!: ElementRef;
  selectedIndex = -1;

  @Input() filterObjectList!: any[];
  @Input() extendFunctionLabel!: any;
  @Input() selectedObject: any = {};
  oldObject!: any;
  jsonObject: any;
  isUpdate: boolean = false;
  
  eventInput!: Event;
  cols: Column[] = [];
  types: Type[] = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setStyle(index: number, styleField: any): any {
    if (styleField == undefined) {
      return {};
    }
    this.types = JSON.parse(JSON.stringify(this.styleList));
    if (this.styleField != null && styleField != null) {
      for (let i = 0; i < this.types.length; i++) {
        if (styleField.toString() == Object.keys(this.types[i])[0]) {
          let obj: any = this.types[i];
          return { 'color': obj[Object.keys(this.types[i])[0]] };
        }
      }
    }
  }

  ngOnInit(): void {
    this.control = new FormControl({ value: this.value, disabled: this.isDisabled }, Validators.required);
    this.control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(searchString => {
      this.handleInput(this.eventInput);
    });

    for (let i = 0; i < this.hearder.length; i++) {
      let column: Column = { field: this.fields[i], header: this.hearder[i] };
      this.cols.push(column);
    }
  }

  constructor(private utilsService: UtilsService, private messageService: MessageService, private confirmationService: ConfirmationService,
    private renderer: Renderer2) { }

  showFooter() {
    return this.extendFunctionLabel != null ? true : false;
  }

  callFunctionExtend(functionName: any) {
    this.extendFunctionEvent.emit(functionName);
  }

  InputEvent(event: Event) {
    this.eventInput = event;
  }

  handleInput(event: Event) {
    if (event) {
      const target = event.target as HTMLInputElement;
      this.value = target.value;
      this.onChange(this.value);
      let searchString = this.utilsService.toLowerCaseNonAccentVietnamese(this.value);
      this.CallBackEvent.emit(searchString);
      this.selectedObject = {};
      this.selectedIndex = -1;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterObjectList']) {
      if (this.popover && this.eventInput && this.input.nativeElement == document.activeElement) {
        this.popover.hide();
        setTimeout(() => {
          this.popover.show(this.eventInput);
        }, 10);
      }
    }
    if (changes['isDisabled']) {
      if (this.control != null) {
        if (this.isDisabled)
          this.control.disable();
        else
          this.control.enable();
      }
    }
  }

  hightlightInitItem() {
    setTimeout(() => {
      if (this.value) {
        const field = this.fieldShow;
        let isFound = false;
        this.selectedObject = Object.assign(this.selectedObject, { [field]: this.value });
        this.filterObjectList.forEach(item => {
          if (this.selectedObject[field] === item[field]) {
            this.selectedObject = deepCopy(item);
            isFound = true;
          }
        })
        setTimeout(() => {
          if (!isFound) {
            this.CallBackEvent.emit(this.utilsService.toLowerCaseNonAccentVietnamese(this.selectedObject[field].toString()));
            setTimeout(() => {
              this.filterObjectList.forEach(item => {
                if (this.selectedObject[field] === item[field]) {
                  this.selectedObject = deepCopy(item);
                }
              })
            }, 1000);
          }
        }, 0);
      } else {
        this.CallBackEvent.emit('');
      }
    }, 0);
  }

  openPopover(event: Event) {
    this.popover.show(event, this.input.nativeElement);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.popover && this.popover.overlayVisible) {
      if (event.key === 'ArrowDown') {
        this.selectedIndex = (this.selectedIndex + 1) % this.filterObjectList.length;
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        if (this.selectedIndex < 0) {
          this.selectedIndex = this.filterObjectList.length - 1;
        } else {
          this.selectedIndex = (this.selectedIndex - 1 + this.filterObjectList.length) % this.filterObjectList.length;
        }
        event.preventDefault();
      } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
        this.onRowSelect(this.filterObjectList[this.selectedIndex]);
      }
    }
  }

  addObject(item: any) {
    this.selectedObject = item;
    this.selectedIndex = this.filterObjectList.indexOf(this.selectedObject);
    this.popover.hide();
    this.input.nativeElement.blur();
  }

  onRowSelect(item: any) {
    this.addObject(item);
    this.value = item[this.fieldShow];
    this.onChange(this.value);
    this.selectedEvent.emit(item);
    if (this.isClearOnChoose)
      this.value = "";
  }

  onRowUnselect(event: any) {
    this.messageService.add({ severity: 'error', summary: 'Object Unselected', detail: event.data.name });
    this.selectedIndex = -1;
  }
}
