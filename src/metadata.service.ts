
import { CustomHttp } from './custom-http';
import { Injectable, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import { parseString } from 'xml2js';
@Injectable()
export class MetadataService {
    private metadtaUrl: string;
    private ObservableBuffer: Observable<Object> = null;
    private _entitySetName: string;

    constructor(private http: CustomHttp) { }

    public setServiceUrl(serviceUrl: string) {
        this.metadtaUrl = serviceUrl + '$metadata';
    }

    private getMetadata(): Observable<Object> {
        if (this.ObservableBuffer === null) {
            const firstHeaders = new Headers();
            //           firstHeaders.append('Authorization', `Basic ...`);
            this.ObservableBuffer = this.http.get(this.metadtaUrl, {
                headers: firstHeaders
            })
                .map(this.parseXML)
                .catch(this.handleError)
        }
        return this.ObservableBuffer;
    }

    private parseXML(res: Response) {

        let metadata: Object;
        parseString(res.text(), function (err: any, result: any) {
            metadata = result;
        });
        return metadata;

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

    getMetadataProperties(entitySetName: string): Observable<Object> {
        this._entitySetName = entitySetName;
        return this.getMetadata()
            .map(this.getPropertiesOfSet, this)
            .catch(this.handleError);
    }

    private getPropertiesOfSet(f: Object) {
        const sets = this.findElement(f, 'EntitySet');
        const entitySet = sets.filter((f: any) => f['$']['Name'] === this._entitySetName)
        const entityTypeName = entitySet[0]['$']['EntityType'].replace(/.*\.(.*)/, '$1') 
        const entityTypes = this.findElement(f, 'EntityType');
        const entityType = entityTypes.filter((f: any) => f['$']['Name'] === entityTypeName);
        const properties = entityType[0]['Property'];
        return properties;
    }

    getEntitySets(): Observable<Object[]> {
        return this.getMetadata()
            .map(md => { return this.findElement(md, 'EntitySet') })
            .catch(this.handleError);

    }

    /**
     * Takes an JSON Object, iterates recursively and returns a single Element named <elementName>
     * Once we have a hit, we do no more drilldown.
     * @param {Object} obj 
     * @param {String} elementName 
     * @returns {Object} 
     */
    private findElement(obj: Object, elementName: String): any {
        let _hit: Object = null;
        // tslint:disable-next-line:forin
        for (const i in obj) {
            if (i === elementName) {
                return obj[i];
            }
            if (_hit == null && (Object.prototype.toString.call(obj[i]) === '[object Object]' ||
                Object.prototype.toString.call(obj[i]) === '[object Array]')) {
                _hit = this.findElement(obj[i], elementName);
            }
        }
        return _hit;
    }
}
