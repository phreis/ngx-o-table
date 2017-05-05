import { FieldCatalogField } from './fieldcatalog.field';
import { FieldcatalogFormatFunctions } from './fieldcatalog.format.functions';

export class Fieldcatalog {
    protected FieldCatalogFields: FieldCatalogField[] = [];

    constructor(public Properties: Object) {
        this.FieldCatalogFields = <FieldCatalogField[]>Properties;
        let col_id = 0;
        let col_pos = 0;
        for (let field of this.FieldCatalogFields) {
            //set defaults
            field.fieldname = field['$']['Name'];
            field.col_id = col_id++;
            field.col_pos = col_pos++;
            (field['$']['sap:label']) ? field.coltext = field['$']['sap:label'] : field.coltext = field['$']['Name'];
            field.display = '';
        }
    }
    getFields(): FieldCatalogField[] {

        return this.FieldCatalogFields
    }


}

