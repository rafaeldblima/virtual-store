import { OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from './base.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Subscription } from 'rxjs';
import { BaseHttpService } from '../services/base-http.service';
import { RemoveModalComponent } from './remove-modal/remove-modal.component';
import { DependencyInjector } from '../dependency-injector';
import { RemoveService } from '../services/remove.service';
import { BaseModel } from '../models/base.model';

export class BaseListComponent<T extends BaseModel> extends BaseComponent implements OnInit, OnDestroy {


  public objects: T[];
  public noResults = true;
  protected modalComponent: any;

  protected service: BaseHttpService<T>;
  protected modalService: ModalDialogService;
  protected viewRef: ViewContainerRef;
  protected listSub: Subscription;
  protected subsDelete: Subscription;
  protected removeService: RemoveService;
  private removedSubscription: Subscription;
  private updateList: Subscription;

  constructor() {
    super();
    this.removeService = DependencyInjector.inject(RemoveService);
  }

  public ngOnInit() {
    this.objects = new Array<T>();
    this.listenToEvents();
    this.getList();
  }

  public ngOnDestroy() {
    if (this.listSub) {
      this.listSub.unsubscribe();
    }
    if (this.subsDelete) {
      this.subsDelete.unsubscribe();
    }
    if (this.removedSubscription) {
      this.removedSubscription.unsubscribe();
    }
    if (this.updateList) {
      this.updateList.unsubscribe();
    }
  }

  public getList() {
    this.objects = new Array<T>();
    this.loading = true;
    this.listSub = this.service.getList().subscribe((response: any) => {
      if (response.length > 0) {
        this.objects = response;
        this.noResults = false;
      } else {
        this.noResults = true;
      }
    }, (error) => {
      this.noResults = true;
      console.error(error);
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  public openRemoveModal(object: T) {
    let data = {};
    data = Object.assign(data, object);
    this.modalService.openDialog(this.viewRef, {
      childComponent: RemoveModalComponent,
      data: data
    });
  }

  public update(object) {
    this.openEditModal(object);
  }

  public openEditModal(object?: T) {
    let data = {};
    data = Object.assign(data, object);
    this.modalService.openDialog(this.viewRef, {
      childComponent: this.modalComponent,
      data: data
    });
  }

  public openGenericModal(object: any, component: any) {
    let data = {};
    data = Object.assign(data, object);
    this.modalService.openDialog(this.viewRef, {
      childComponent: component,
      data: data
    });
  }

  public remove(object) {
    object.loading = true;
    this.subsDelete = this.service.delete(object._id).subscribe(() => {
      this.toastr.success('Exclusão realizada com sucesso.');
      this.getList();
    }, error => {
      const message = 'Não foi possível realizar a exclusão.';
      this.toastr.error(message, 'Erro ao realizar a exclusão:');
      console.error(error);
      delete object.loading;
    }, () => {
      delete object.loading;
      this.service.getListAgain(true);
    });
  }


  protected listenToEvents() {
    this.removedSubscription = this.removeService.elementRemovedConfirm.subscribe((object: T) => {
      this.remove(object);
    });
    this.updateList = this.service.updateList.subscribe((confirm: boolean) => {
      if (confirm) {
        this.getList();
      }
    });
  }


}
