# ngx-o-table

[![npm](https://img.shields.io/npm/v/ngx-o-table.svg)]()

A lightweight, generic [Angular (v2+)](https://github.com/angular/angular) component to display data provided by an [Odata](http://www.odata.org/) source.

## Features
- Metadata driven
- Allows multiple OData endpoints within one App
- Customizable table properties
- Pagination included

## Working with
- Angular (v2+)

## Installation
To use ngx-o-table in your project install it via [npm](https://www.npmjs.com/package/ngx-o-table):
```
npm install --save ngx-o-table
```

Then include it in your application's main module:

```ts
import { OtableModule } from 'ngx-o-table';

@NgModule({
  imports: [
    ...
    OtableModule,
    ...
```

## Usage

Your Odatatable would look like this in an Angular template:

```
  <ngx-o-table
    [entitySetName]="'Products'" 
    [serviceUrl]="'/V3/Northwind/Northwind.svc/'" 
    [itemsPerPage] = "'5'"
    [maxPagesInPagination] = "'3'">
  </ngx-o-table> 
```
Just feed in the name of the entity set you want to display along with the ServiceURL and you are good to go.
 `itemsPerPage` and `maxPagesInPagination` are optional.

## Theming

The table is styled with [Bootstrap 3.3.7](http://getbootstrap.com/)

This is planned to be changed to [Material 2](https://material.angular.io/components) as soon as a `DataTable` component is available.

## Live Demo

To see `ngx-o-table` in action (head to `/demo-basic`), a few steps are required:

- you need `Angular-CLI` v1.0 or later (`npm install -g @angular/cli`)
- from the `demo-basic` folder, run `npm install` 
- then start `ng serve` 

You might use `ng serve --proxy-config proxy.conf.json` to get rid of the Same-origin policy.

`proxy.conf.json` could look like this:
```
{
    "/V3/*": {
    "target": "http://services.odata.org",
    "secure": false,
    "changeOrigin": true
  }
}
```
