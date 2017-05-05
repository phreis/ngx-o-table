import { Pipe, PipeTransform } from '@angular/core';
import { FieldcatalogFormatFunctions } from './fieldcatalog.format.functions'

@Pipe({
    name: 'fieldcatalogPipe'
})
export class FieldcatalogPipe implements PipeTransform {

    transform(value: string, modifier: string): string {
        if (!modifier) return value;
        return FieldcatalogFormatFunctions[modifier](value);
    }


}
