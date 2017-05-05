import { CustomHttpMonitorService } from './custom-http-monitor.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { ConnectionBackend, RequestOptionsArgs } from '@angular/http';
import { Request } from '@angular/http';
import { Response, XHRBackend } from '@angular/http';



export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private monitorService: CustomHttpMonitorService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    return super.request(url, options).catch(res => {

      return res;
      // do something
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {

    this.monitorService.busy();

    const response = super.get(url, options).share();

    response.subscribe(null, error => {
      this.monitorService.complete();
            console.log(error);
    }, () => {
      this.monitorService.complete();
    });

    return response;
  }


}

export function customHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, monitor: CustomHttpMonitorService) {
  return new CustomHttp(backend, defaultOptions, monitor);

}