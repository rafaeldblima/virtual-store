import { BaseComponent } from './base.component';
import { Subject, Subscription } from 'rxjs';
import { ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { BaseHttpService } from '../services/base-http.service';
import { BaseModel } from '../models/base.model';
import { FormGroup } from '@angular/forms';

export abstract class BaseModalComponent<T extends BaseModel> extends BaseComponent implements OnInit, IModalDialog, OnDestroy {

  public object: any;
  public saveLoading: boolean;
  public loading: boolean;
  public noResults: boolean;
  public closingSubject$: Subject<void>;
  public modalForm: FormGroup;

  protected CUSTOM_SUCESS_MSG: string;
  protected CUSTOM_ERROR_MSG: string;
  protected service: BaseHttpService<T>;
  private saveSub: Subscription;

  dialogInit(
    reference: ComponentRef<IModalDialog>,
    options: Partial<IModalDialogOptions<any>>) {
    this.closingSubject$ = options.closeDialogSubject;
    this.object = options.data;
  }

  protected constructor() {
    super();
  }

  ngOnInit() {
    if (!this.object) {
      this.object = <T>{};
    }
    this.initForm();
  }

  public ngOnDestroy() {
    if (this.saveSub) {
      this.saveSub.unsubscribe();
    }
  }

  abstract initForm();

  public close() {
    if (this.closingSubject$) {
      this.closingSubject$.next();
    }
  }

  public save(customObj?) {
    this.saveLoading = true;
    let object = this.modalForm.value;
    if (customObj) {
      object = customObj;
    }
    const action = object.id ? this.service.update(object) : this.service.create(object);
    let message = object.id ? 'Item atualizado com sucesso.' : 'Item adicionado com sucesso.';
    this.saveSub = action.subscribe(() => {
        if (this.CUSTOM_SUCESS_MSG) {
          message = this.CUSTOM_SUCESS_MSG;
        }
        this.toastr.success(message);
      }, error1 => {
        console.error(error1);
        message = 'Não foi possível salvar o item.';
        if (this.CUSTOM_ERROR_MSG) {
          message = this.CUSTOM_ERROR_MSG;
        }
        this.toastr.error(message, 'Erro(s) ao salvar o item:');
        this.saveEnd();
      },
      () => {
        this.saveEnd(true);
      }
    );
  }

  private saveEnd(sucess?) {
    this.saveLoading = false;
    this.service.getListAgain(true);
    if (sucess) {
      this.close();
    }
  }
}
