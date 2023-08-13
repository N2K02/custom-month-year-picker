import moment from 'moment';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { MomentNgbDatePickerConvertor } from './moment-ngb-date-picker-converter';

/*
 * This class is taken from https://github.com/ng-bootstrap/ng-bootstrap/issues/545
 * It serves two purposes:
 * - When selecting dates with the date picker, it displays the date in correct
 *    format -> MM.YYYY
 * - When entering a date in the input field, it uses moment to parse the input
 *   into a sensible date with locale format (e.g. 042021 -> 04.2021)
 */
@Injectable()
export class MonthYearNgbDateParser implements NgbDateParserFormatter {
    /**
     * Parses the entered date.
     *
     * @param value the entered date.
     */
    parse(value: string | null): NgbDateStruct | null {
        if (value) {
            const momentDate: moment.Moment = moment(value, 'MM.YYYY');
            if (momentDate.isValid()) {
                const ngbDateStruct: NgbDateStruct | null = MomentNgbDatePickerConvertor.toNgbDateStruct(momentDate);
                return ngbDateStruct;
            }
        }

        return null;
    }

    /**
     * Formats a date into a language specific string.
     *
     * @param date the data from the model.
     */
    format(date: NgbDateStruct | null): string {
        let formattedMomentDate: string = '';

        if (date) {
            const momentDate: moment.Moment = MomentNgbDatePickerConvertor.toMoment(date);
            formattedMomentDate = momentDate.format('MM.YYYY');
        }

        return formattedMomentDate;
    }
}
