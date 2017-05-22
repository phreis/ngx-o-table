import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OtableModule } from 'ngx-o-table';
import { Dsrc2Component } from './dsrc2/dsrc2.component';
import { Dsrc3Component } from './dsrc3/dsrc3.component';
import { MdSelectModule } from '@angular/material';
import { Dsrc4Component } from './dsrc4/dsrc4.component';
import { Dsrc5CdsComponent } from './dsrc5-cds/dsrc5-cds.component';
@NgModule({
  declarations: [
    AppComponent,
    Dsrc2Component,
    Dsrc3Component,
    Dsrc4Component,
    Dsrc5CdsComponent
  ],
  imports: [
    BrowserModule, 
    OtableModule, 
    MdSelectModule
  ],
  providers: [],

  bootstrap: [AppComponent]

})
export class AppModule { }
