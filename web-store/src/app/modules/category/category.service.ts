import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { environment } from '../../../environments/environment';
import { CategoryModel } from './category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseHttpService<CategoryModel> {

  constructor() {
    super();
    this.serverUrl += `${environment.API.CATEGORY}`;
  }
}
