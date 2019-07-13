import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { environment } from '../../../environments/environment';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseHttpService<ProductModel> {

  constructor() {
    super();
    this.serverUrl += `${environment.API.PRODUCTS}`;
  }
}
