import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PaginatorComponent } from './paginator/paginator';

import { AtsuiPaginatorModule } from 'atsui';

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AtsuiPaginatorModule
  ],
  providers: [],
  bootstrap: [
    PaginatorComponent
  ]
})
export class AppModule { }
