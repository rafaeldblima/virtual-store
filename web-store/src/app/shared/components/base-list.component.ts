import { OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from './base.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Subscription } from 'rxjs';
import { BaseHttpService } from '../services/base-http.service';
import { RemoveModalComponent } from './remove-modal/remove-modal.component';
import { DependencyInjector } from '../dependency-injector';
import { RemoveService } from '../services/remove.service';
import { BaseModel } from '../models/base.model';
import * as $ from 'jquery';
import { Paginator } from '../models/paginator.model';

export class BaseListComponent<T extends BaseModel> extends BaseComponent implements OnInit, OnDestroy {


  public objects: T[];
  public noResults = true;
  protected modalComponent: any;
  public paginator: Paginator;

  protected service: BaseHttpService<T>;
  protected listSub: Subscription;
  protected subsDelete: Subscription;
  protected removeService: RemoveService;
  private removedSubscription: Subscription;
  private updateList: Subscription;
  public filters: any = {};

  constructor(
    protected modalService: ModalDialogService,
    protected viewRef: ViewContainerRef
  ) {
    super();
    this.removeService = DependencyInjector.inject(RemoveService);
  }

  public ngOnInit() {
    this.objects = new Array<T>();
    this.paginator = new Paginator();
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
    this.setPaginator();
    this.objects = new Array<T>();
    this.loading = true;
    const filter: any = {};
    $.extend(true, filter, this.filters);
    filter.count = 10;
    filter.order = 'ASC';
    if (!filter.page) {
      filter.page = 0;
    } else {
      filter.page = filter.page - 1;
    }
    filter.sort = 'id';
    this.listSub = this.service.getList(filter).subscribe((response) => {
      if (!response.empty) {
        this.objects = response.content;
        this.setPaginator(response, this.filters.page);
        this.noResults = false;
      } else {
        this.setPaginator();
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

  public remove(object) {
    object.loading = true;
    this.subsDelete = this.service.delete(object.id).subscribe(() => {
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

  protected setPaginator(response?: any, page?: number, limit?: number): void {
    if (response && !page) {
      page = 0;
      this.filters.page = 1;
    }
    if (!limit) {
      limit = 10;
      this.filters.count = 10;
    }
    if (page || page === 0) {
      this.paginator.pageSize = limit;
      this.paginator.pageNumber = page;
      this.paginator.totalResults = response.totalElements;
      this.paginator.totalPages = Math.ceil(response.totalElements / limit);
    } else {
      this.paginator.totalResults = 0;
      this.paginator.totalPages = 0;
      this.paginator.pageNumber = 1;
    }
  }

  public pageChanged(event: any) {
    this.filters.page = event.page;
    this.getList();
  }


}
