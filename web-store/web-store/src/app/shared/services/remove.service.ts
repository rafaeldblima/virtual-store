import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoveService {
  public elementRemovedConfirm = new Subject();

  constructor() {
  }

  public objectRemoveConfirm(object) {
    this.elementRemovedConfirm.next(object);
  }
}
