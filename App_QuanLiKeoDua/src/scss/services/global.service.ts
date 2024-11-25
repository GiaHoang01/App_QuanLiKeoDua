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
  OnLoadpage() {
    const el = document.getElementById('PageLoading');
    if (el) el.style.display = 'flex';
  }

  OffLoadpage() {
    const el = document.getElementById('PageLoading');
    if (el) {
      setTimeout(() => {
        el.style.display = 'none';
      }, 1000);
    }
  }
  
  
  
}

