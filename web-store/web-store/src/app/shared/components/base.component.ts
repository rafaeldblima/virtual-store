import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { DependencyInjector } from '../dependency-injector';

export class BaseComponent {

  public loading: boolean;
  public saveLoading: boolean;
  public noResults: boolean;
  protected toastr?: ToastrService;
  protected router?: Router;

  constructor() {
    this.toastr = DependencyInjector.inject(ToastrService);
    this.router = DependencyInjector.inject(Router);
  }

}
