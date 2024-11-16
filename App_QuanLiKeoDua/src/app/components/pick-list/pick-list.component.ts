import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PickListModule } from 'primeng/picklist';

interface Product
{
  name:string
}
@Component({
  selector: 'app-pick-list',
  standalone: true,
  imports: [PickListModule],
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.scss'],
})
export class PickListComponent implements OnInit{
  sourceProducts!: Product[];
  targetProducts: Product[] = [];

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
      this.sourceProducts = [
        { name: 'Bamboo Watch' },
        { name: 'Black Watch' },
      ];
  
      this.cdr.markForCheck();
    }
}
