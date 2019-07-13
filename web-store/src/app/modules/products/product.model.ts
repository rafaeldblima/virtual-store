import { BaseModel } from '../../shared/models/base.model';
import { CategoryModel } from '../category/category.models';

export class ProductModel extends BaseModel {
  code: string;
  stockQuantity: number;
  description: string;
  price: number;
  category: CategoryModel;
}
