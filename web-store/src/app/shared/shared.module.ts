import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';
import { ResumirPipe } from './pipes/resumir.pipe';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaginationModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoaderSectionComponent } from './components/loader-section/loader-section.component';
import { NoResultComponent } from './components/no-result/no-result.component';

@NgModule({
  declarations: [
    RemoveModalComponent,
    ResumirPipe,
    TopBarComponent,
    PaginatorComponent,
    LoaderSectionComponent,
    NoResultComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule.forRoot(),
    FormsModule,
    BrowserModule,
  ],
  bootstrap: [
    RemoveModalComponent
  ],
  exports: [
    RemoveModalComponent,
    ResumirPipe,
    TopBarComponent,
    PaginatorComponent,
    LoaderSectionComponent,
    NoResultComponent,
  ]
})
export class SharedModule {
}
