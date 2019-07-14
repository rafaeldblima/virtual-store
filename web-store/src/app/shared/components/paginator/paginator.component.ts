import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Paginator } from '../../models/paginator.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Output() pageChange = new EventEmitter<any>();
  @Input() paginator: Paginator;

  constructor() {
  }

  public pageChanged(event: any) {
    if (event.page !== this.paginator.pageNumber) {
      this.pageChange.emit(event);
    }
  }

}
