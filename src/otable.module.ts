
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldcatalogPipe } from './fieldcatalog.pipe';
import { Fieldcatalog } from './fieldcatalog';

import { PaginationDirective } from './pagination.directive';
import { GenericListComponent } from './generic-list/generic-list.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    FieldcatalogPipe,
    PaginationDirective,
    GenericListComponent
  ],
  exports: [ GenericListComponent],
})
export class OtableModule { }
