import { Component, Input,Output, OnInit, inject, EventEmitter, HostListener, ViewChild, ElementRef, Renderer2, forwardRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
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
  imports: [OverlayPanelModule,CommonModule,TableModule,ToastModule,FormsModule
    ,ConfirmDialogModule,ReactiveFormsModule],
 templateUrl: './app-quick-search.component.html',
  styleUrl: './app-quick-search.component.scss',
  providers:[MessageService,ConfirmationService,{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppQuickSearchComponent),
    multi: true,
  },],
})

export class AppQuickSearchComponent implements OnInit, ControlValueAccessor {
  selectedCountryAdvanced: any[] | undefined;
  //INPUT   
  @Input()  params!:string;
  @Input()  name!:string;
  control!:FormControl ;
  @Input() hearder:any[] = [];
  @Input() fields:any[] = [];
  @Input() styleField:any;
  @Input() styleList!:any[];
  @Input() inputClass!:string;
  @Input() required:boolean = false;
  @Input() inputStyle!:string;
  @Input() fieldShow!:string;
  @Input() outputField!:string;
  @Input() value:string | null = '';
  @Input() placeHolder:string = '';
  @Input() isDisabled:boolean = false;
  @Input() isClearOnChoose:boolean = false;
  //OUTPUT
  @Output() CallBackEvent = new EventEmitter<any>();
  @Output() extendFunctionEvent = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() selectedEvent = new EventEmitter<any>();
  

  //View
  @ViewChild('op') op!: OverlayPanel;
  @ViewChild('input') input!: ElementRef;
  selectedIndex = -1;

  //Object
  @Input() filterObjectList!: any[];
  
  @Input() extendFunctionLabel!:any;
  @Input() selectedObject:any = {};
  oldObject!: any;
  jsonObject:any;
  isUpdate:boolean = false;
  

  //Service
  // stockService:StockServ ice = inject(StockService);
  
  eventInput!:Event;
  //Mảng cặp giá trị {header,field}
  cols: Column[] = [];
  
  //Voucher Type
  types : Type[] = [];

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
  setStyle(index:number, styleField:any):any{
    if(styleField == undefined){
      return {};
    }
    this.types = JSON.parse(JSON.stringify(this.styleList));
    if(this.styleField != null && styleField != null)
    {
      for(let i=0; i< this.types.length; i++){
        if(styleField.toString() == Object.keys(this.types[i])[0]){
          let obj:any = this.types[i];
          //ngClass = ngClass  + this.types[i].color;
          return { 'color': obj[Object.keys(this.types[i])[0]] };
        }    
      }
  }
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    
    //
  }

  

  ngOnInit(): void {
    this.control = new FormControl({value: this.value, disabled: this.isDisabled}, Validators.required);
    //this.searchControl.disabled = this.isDisable; 
    this.control.valueChanges.pipe(
      debounceTime(500), // Đợi 300ms sau khi người dùng ngừng gõ
      distinctUntilChanged(), // Chỉ tiếp tục nếu giá trị thực sự thay đổi
    ).subscribe(searchString => {
      this.handleInput(this.eventInput);
    });


    // this.jsonObject = JSON.parse(this.params);
    

    for(let i=0; i< this.hearder.length; i++){
      let column : Column = { field: this.fields[i], header: this.hearder[i] };

      this.cols.push(column);
    }
    //this.handleInput(null);
    //this.jsonObject.SearchString = "";
    if(!this.value) {
      this.CallBackEvent.emit("");
    }else{
      
    }
    //this.getAllData();
  }

  constructor(private utilsService:UtilsService,private messageService:MessageService,private confirmationService:ConfirmationService
    ,private renderer: Renderer2
  ){ 
  }

  /**
   * Checks if the function extend is available.
   * 
   * @returns {boolean} True if function extend is available, false otherwise.
   * 
   */
  showFooter(){
    return this.extendFunctionLabel != null ? true : false;
  }

  /**
   * Calls the function extend item event with the given function name.
   * 
   * @param {any} functionName The name of the function to call.
   * 
   * @example
   * this.callFunctionExtend('myFunction');
   * // This will emit the functionExtendItemEvent with 'yFunction' as the argument.
   */

  callFunctionExtend( functionName :any){
    
    this.extendFunctionEvent.emit(functionName);
  }
  /**
   * Tìm kiếm đối tượng bằng searchString.
   * @param searchString thông tin tìm kiếm của 1 đối tượng.
   * @description
   * //gửi luồng dữ liệu searchString lấy từ thẻ <input> đến component cha
   *@example
   * // Example usage:
   * // Bắt sự kiện (input) 
   * <input type="text" [value]="getObject()" #input (input)="handleInput(input.value)" (click)="op.show($event)" >
   */
  // handleInput(searchString:string){ 
  //  
  //   searchString = this.utilsService.toLowerCaseNonAccentVietnamese(searchString);
  //  
  //   this.jsonObject.SearchString = searchString;
  //   this.newItemEvent1.emit(this.jsonObject);
  //   this.selectedIndex = -1; // Reset selection
  // }
  InputEvent(event:Event){
    this.eventInput = event;
  }

  handleInput(event:Event){
    if(event){
      const target = event.target as HTMLInputElement;
      this.value = target.value;
      this.onChange(this.value);
      let length = this.filterObjectList.length;
      //this.valueChange.emit(this.value);
      let searchString = this.utilsService.toLowerCaseNonAccentVietnamese(this.value);
      //this.jsonObject.SearchString = searchString;
      //this.newInputEvent.emit(this.jsonObject);
      
      this.CallBackEvent.emit(searchString);
      this.selectedObject ={};
      this.selectedIndex = -1; // Reset selection
      } 
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterObjectList']) {
        if (this.op && this.eventInput && this.input.nativeElement == document.activeElement) {
          this.op.hide();
          setTimeout(() => {
            this.op.show(this.eventInput);     
          }, 10);
        }   
    }
    if(changes['isDisabled']) {
      if(this.control!=null){
        if(this.isDisabled)
          this.control.disable();
        else
          this.control.enable();
      }    
    }
    // if(changes['value']) {
    //     let inputElement = this.input.nativeElement as HTMLInputElement;
       
    //     const event = new Event('input', { bubbles: true });
    //     inputElement.dispatchEvent(event);
    // }
    
  }

  hightlightInitItem(){
    setTimeout(() => {
      if(this.value){
        const field = this.fieldShow;
        let isFound = false;
        this.selectedObject = Object.assign(this.selectedObject, { [field]: this.value });
        this.filterObjectList.forEach(item => {
          if(this.selectedObject[field] === item[field]){
            this.selectedObject = deepCopy(item);
            isFound = true;
          }
        })
        setTimeout(() => {
          if(!isFound){
            this.CallBackEvent.emit(this.utilsService.toLowerCaseNonAccentVietnamese(this.selectedObject[field].toString()));
            setTimeout(() => {
              this.filterObjectList.forEach(item => {
                if(this.selectedObject[field] === item[field]){
                  this.selectedObject = deepCopy(item);
                }              
              })
            }, 1000);
            
          }
        }, 0);
      }else{
        this.CallBackEvent.emit('');
      }
    },0);
  }
  // resetOverlayPanel(length:number,oldHeight:number,event:Event){
    // setTimeout(() => {
    //   if(this.filterObjectList.length != length){
    //     if(this.op.container){
    //       const newHeight = this.op.container.clientHeight;
    //       const top = this.op.container.getBoundingClientRect().top;
    //       if(top < this.input.nativeElement.getBoundingClientRect().top)
    //         this.op.container.style.setProperty('top',(top+oldHeight-newHeight)+'px');
    //     }
    //   }
    // }, 200);

    // setTimeout(() => {
    //   if(this.filterObjectList.length != length){
    //     if (this.op) {
    //       this.op.hide();
    //       setTimeout(() => {
    //         this.op.show(event);     
    //       }, 0);
    //     }
    //   }
      
    // }, 200);
    
    //   this.op.align();
  // }
  /**
   * nhận giá trị của thuộc tính đầu tiên của đối tượng đã chọn.
   * @returns Một giá trị của thuộc tính đầu tiên của đối tượng đã chọn.
   * @description
   * //gửi luồng dữ liệu searchString lấy từ thẻ <input> đến component cha
   * @example
   * // Example usage:
   * // Cập nhật giá trị của thẻ <input> bằng với giá trị thuộc tính đối tượng đã chọn
   * <input type="text" [value]="getObject()" #input (input)="handleInput(input.value)" (click)="op.show($event)" >
   */
  getObject():any{
    if(this.selectedObject == null || this.selectedObject[this.fieldShow] == null)
      return '';
    return this.selectedObject[this.fieldShow];
  }
  
  /**
   * Opens the overlay panel.
   * @param event The event that triggered the opening of the overlay panel.
   */
  openPanel(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      inputElement.select(); // Bôi đen toàn bộ giá trị trong input
      this.op.show(event, this.input.nativeElement);
  }

  /**
   * Handles keyboard events on the document, specifically arrow key presses and Enter key presses.
   * 
   * When the overlay is visible, this function updates the selected index based on the arrow key presses.
   * When the Enter key is pressed, it adds the selected object to the list.
   * 
   * @param event The KeyboardEvent object
   * @example
   * // Assuming the component has an overlayVisible property set to true
   * // and a filterObjectList property with an array of objects
   * // When the user presses the ArrowDown key, the selectedIndex will be incremented
   * // When the user presses the Enter key, the selected object will be added to the list
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.op && this.op.overlayVisible) {
      if (event.key === 'ArrowDown') {
        this.selectedIndex = (this.selectedIndex + 1) % this.filterObjectList.length;
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        if (this.selectedIndex < 0) {
          this.selectedIndex = this.filterObjectList.length - 1;
        }else
        this.selectedIndex = (this.selectedIndex - 1 + this.filterObjectList.length) % this.filterObjectList.length;     
        event.preventDefault();
      } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
        this.onRowSelect(this.filterObjectList[this.selectedIndex]);  
      }
    }
  }


  /**
   * thêm đối tượng.
   * @param item Đối tượng.
   * @description
   * // thêm đối tượng đã chọn từ overPanel vào selectedObject
   */
  addObject(item : any){
    this.selectedObject = item;
    this.selectedIndex = this.filterObjectList.indexOf(this.selectedObject);
    this.op.hide();
    this.input.nativeElement.blur(); // Remove focus from input
  }

  /**
   * Bắt và xử lý sự kiện (onRowSelect) của overlayPanel.
   * @param event .
   * @description
   * //Gọi phương thức addObject() thêm đối tượng, lưu vị trí đối tượng đã chọn và gửi message
   */
  onRowSelect(item: any) {
    this.addObject(item);
    this.value = item[this.fieldShow];
    this.onChange(this.value);
      this.selectedEvent.emit(item);
      if(this.isClearOnChoose)
        this.value = "";
  }
  
  /**
   * Bắt và xử lý sự kiện (onRowUnSelect) của overlayPanel.
   * @param event .
   * @description
   * // gửi message
   */
  onRowUnselect(event: any) {
    
      this.messageService.add({ severity: 'error', summary: 'Object Unselected', detail: event.data.name });
      this.selectedIndex = -1;
  }
}
