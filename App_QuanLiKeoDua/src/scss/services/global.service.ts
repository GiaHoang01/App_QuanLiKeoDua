import { Injectable } from '@angular/core';
import { Paging } from '../../app/interfaces/paging';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  paging!:Paging;

  constructor() {
    this.paging = new Paging();
  }
}

