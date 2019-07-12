import { Component, ComponentRef, OnInit } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Subject } from 'rxjs';
import { RemoveService } from '../../services/remove.service';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent implements OnInit, IModalDialog {

  public object: any;
  public saveLoading: boolean;
  public closingSubject$: Subject<void>;
  private event: string;

  dialogInit(
    reference: ComponentRef<IModalDialog>,
    options: Partial<IModalDialogOptions<any>>) {
    this.closingSubject$ = options.closeDialogSubject;
    this.object = options.data;
  }

  constructor(private removeService: RemoveService) {
    this.saveLoading = false;
  }

  ngOnInit() {
  }

  public close() {
    if (this.closingSubject$) {
      this.closingSubject$.next();
    }
  }

  public async confirm() {
    this.saveLoading = true;
    this.removeService.objectRemoveConfirm(this.object);
    this.close();
  }

}
