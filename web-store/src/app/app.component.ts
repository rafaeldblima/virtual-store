import { Component, Injector } from '@angular/core';
import { DependencyInjector } from './shared/dependency-injector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-store';

  constructor(injector: Injector) {
    DependencyInjector.setup(injector);
  }
}
