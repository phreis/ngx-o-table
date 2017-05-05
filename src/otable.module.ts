
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { FieldcatalogPipe } from './fieldcatalog.pipe';
import { Fieldcatalog } from './fieldcatalog';

import { PaginationDirective } from './pagination.directive';
import { CustomHttp, customHttpFactory } from './custom-http';
import { CustomHttpMonitor } from './custom-http-monitor/custom-http-monitor.component';
import { CustomHttpMonitorService } from './custom-http-monitor.service';
import { GenericListComponent } from './generic-list/generic-list.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdSpinner, MdProgressBarModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    HttpModule, 
    BrowserAnimationsModule,
    MdProgressBarModule
  ],
  declarations: [
    FieldcatalogPipe,
    PaginationDirective,
    GenericListComponent,
    CustomHttpMonitor,
    MdSpinner
  ],
  exports: [ GenericListComponent, CustomHttpMonitor ],
  providers: [
    CustomHttpMonitorService,

    {
      provide: CustomHttp, useFactory: customHttpFactory, deps: [XHRBackend, RequestOptions, CustomHttpMonitorService]
    }
  ],
})
export class OtableModule { }
