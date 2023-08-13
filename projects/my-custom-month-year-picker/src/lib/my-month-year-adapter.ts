import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { MomentNgbDatePickerConvertor } from './moment-ngb-date-picker-converter';

/**
 * This Service handles how the date is represented in our domain models (e.g. CertificateDto)
 * The format is YYYY-MM but can be easily adjusted
 */

@Injectable()
export class CustomNgbMonthYearAdapter extends NgbDateAdapter<string>{
    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            const momentDate: moment.Moment = moment(value, 'YYYY-MM');
            return MomentNgbDatePickerConvertor.toNgbDateStruct(momentDate);
        }

        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        if (date) {
            const momentDate: moment.Moment = MomentNgbDatePickerConvertor.toMoment(date);
            return momentDate.format('YYYY-MM');
        }

        return null;
    }
}
