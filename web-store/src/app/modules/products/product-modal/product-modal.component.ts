import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseModalComponent } from '../../../shared/components/base-modal.component';
import { ProductModel } from '../product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../category/category.service';
import { Subscription } from 'rxjs';
import { CategoryModel } from '../../category/category.models';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent extends BaseModalComponent<ProductModel> implements OnInit, OnDestroy {
  private categorySub: Subscription;
  categories: CategoryModel[];

  constructor(
    private categoryService: CategoryService,
    protected service: ProductsService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.CUSTOM_SUCESS_MSG = this.object.id ? 'Produto atualizado com sucesso.' : 'Produto adicionado com sucesso.';
    this.CUSTOM_ERROR_MSG = 'Não foi possível salvar o produto.';
    this.getCategories();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }

  initForm() {
    const category = this.object.category ? this.object.category.id : null;
    this.modalForm = new FormGroup({
      'name': new FormControl(this.object.name, Validators.required),
      'category': new FormControl(category, [Validators.required]),
      'description': new FormControl(this.object.description),
      'stockQuantity': new FormControl(this.object.stockQuantity, [Validators.required, Validators.min(0)]),
      'price': new FormControl(this.object.price, [Validators.required, Validators.min(0)]),
      'code': new FormControl(this.object.code, [Validators.required, Validators.minLength(4)]),
      'id': new FormControl(this.object.id),
    });
  }


  save() {
    const object = this.modalForm.value;
    object.category = {'id': object.category};
    super.save(object);
  }

  private getCategories() {
    this.categorySub = this.categoryService.getListAll().subscribe(resp => {
      this.categories = resp;
    });
  }

}
