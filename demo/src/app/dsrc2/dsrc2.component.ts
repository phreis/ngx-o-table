import { Component } from '@angular/core';

@Component({
  selector: 'app-dsrc2',
  template:
  `
  <ngx-o-table
    [entitySetName]="'Products'" 
    [serviceUrl]="'/V3/Northwind/Northwind.svc/'" >
  </ngx-o-table> 
  `,
})
export class Dsrc2Component { }

