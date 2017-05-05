import { CustomHttp } from './custom-http';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class EntityService {
  //private auth: string = `Basic ...`; // vhcalnplcs
  private auth;
  private baseUrl;
  constructor(private http: CustomHttp) {
  }

  public setServiceUrl(serviceUrl: string) {
    this.baseUrl = serviceUrl;
  }

  getEntitySkipTop(entitySetName: string, skip: string, top: string): Observable<Object[]> {
    let url: string;
    url = this.baseUrl + entitySetName + '/?$skip=' + skip + '&$top=' + top;
    const firstHeaders = new Headers();
    firstHeaders.append('Authorization', this.auth);
    return this.http.get(url, {
      headers: firstHeaders
    })
      .map(this.entityMap, this)
      .catch(this.handleError);
  }

  getEntityCount(entitySetName: string): Observable<number> {
    let url: string;
    url = this.baseUrl + entitySetName + '/$count';
    const firstHeaders = new Headers();
    firstHeaders.append('Authorization', this.auth);
    return this.http.get(url, {
      headers: firstHeaders
    })
      .map(response => response.json())
      .catch(this.handleError);
  }


  getEntitySet(entitySetName: string): Observable<Object> {
    let url: string;
    url = this.baseUrl + entitySetName;
    const firstHeaders = new Headers();
    firstHeaders.append('Authorization', this.auth);



    return this.http.get(url, {
      headers: firstHeaders
    })
      .map(this.entityMap, this)
      .catch(this.handleError);
  }

  entityMap(response: Response) {

    return this.getResultEntity(response.json());
  }

  /**
   * Get the actual Data out of the Response. 
   * Once an Array if found, we do not drill further down.
   * @param {Object} obj 
   * @returns 
   * 
   * @memberOf EntityService
   */
  getResultEntity(obj: Object) {
    let _hit: Object = null;
    for (const i in obj) {
      if (Object.prototype.toString.call(obj[i]) == '[object Array]') {
        return obj[i];
      }
      if (_hit == null && (Object.prototype.toString.call(obj[i]) == '[object Object]')) {
        _hit = this.getResultEntity(obj[i]);
      }
    }
    return _hit;
  }


  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

