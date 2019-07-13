import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { BaseListComponent } from '../../shared/components/base-list.component';
import { ProductModel } from './product.model';
import { ProductsService } from './products.service';
import { ProductModalComponent } from './product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseListComponent<ProductModel> implements OnInit {

  constructor(
    protected service: ProductsService,
    protected modalService: ModalDialogService,
    protected viewRef: ViewContainerRef
  ) {
    super(modalService, viewRef);
    this.modalComponent = ProductModalComponent;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public create() {
    this.openEditModal(new ProductModel());
  }

}
