import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';
import { ResumirPipe } from './pipes/resumir.pipe';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RemoveModalComponent,
    ResumirPipe,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  bootstrap: [
    RemoveModalComponent
  ],
  exports: [
    RemoveModalComponent,
    ResumirPipe,
    TopBarComponent
  ]
})
export class SharedModule {
}
