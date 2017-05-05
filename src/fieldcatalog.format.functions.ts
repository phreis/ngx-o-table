import * as moment from 'moment';
import 'moment/locale/de';
export class FieldcatalogFormatFunctions {

    public static leading_zero_delete(value: string): string {
        return value.replace(/^0*(.*)/, '$1');

    }

    public static timestamp_to_time(value: any): string {

        return moment.unix(value.replace(/\/Date\((\d{10})\d*\)\//, '$1')).format('DD.MM.YY, HH:mm:ss');

    }
}
