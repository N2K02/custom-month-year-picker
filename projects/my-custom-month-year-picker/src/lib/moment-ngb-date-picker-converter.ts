import moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/** Converts ngb date structs to moment and back */
export class MomentNgbDatePickerConvertor {

    public static toMoment(date: NgbDateStruct): moment.Moment {
        const momentObjectParams: any = {
            y: date.year,
            // This is because ngb date construct starts month at 0 instead of 1
            M: date.month - 1,
            d: date.day
        };

        return moment(momentObjectParams);
    }

    public static toNgbDateStruct(date: moment.Moment): NgbDateStruct | null {
        if (!date) {
            return null;
        }

        const ngbDateStruct: NgbDateStruct = {
            day: date.date(),
            month: date.month() + 1,
            year: date.year()
        };

        return ngbDateStruct;
    }
}
