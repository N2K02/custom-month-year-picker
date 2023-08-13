import { Component, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { MonthYearNgbDateParser } from './month-year-ngb-date-parser';
import { CustomNgbMonthYearAdapter } from './my-month-year-adapter';

@Component({
    selector: 'my-custom-month-year-picker',
    templateUrl: './my-custom-month-year-picker.component.html',
    styleUrls: ['my-custom-month-year-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MyCustomMonthYearPickerComponent),
            multi: true
        },
        { provide: NgbDateParserFormatter, useClass: MonthYearNgbDateParser },
        { provide: NgbDateAdapter, useClass: CustomNgbMonthYearAdapter }
    ]

})
export class MyCustomMonthYearPickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input()
    id!: string;

    @Input()
    placeholder!: string;

    @Input()
    ariaRole!: string;

    @Input()
    ariaLabel!: string;

    @Input()
    readonly: boolean = false;

    @Input()
    showPicker: boolean = false;

    @Input()
    required: boolean = false;

    @Input()
    formControlName!: string;

    @Input()
    formControl!: FormControl;

    @Input()
    startYear: number = new Date().getFullYear() - 5;

    @Input()
    endYear: number = new Date().getFullYear() + 5;

    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    yearDropDownFormControl: FormControl = new FormControl('');
    isOpen: boolean = false;
    months: any[] = [];
    years: number[] = [];
    selectedYear: number = new Date().getFullYear();
    selectedMonth: number = (new Date().getMonth() + 1);

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(private controlContainer: ControlContainer) { }

    get control(): FormControl {
        return this.formControl ||
            this.controlContainer.control!.get(this.formControlName) as FormControl;
    }

    ngOnInit(): void {
        this.yearDropDownFormControl.patchValue(this.selectedYear);
        this.generateMonths();
        this.generateYears();
        setTimeout(() => this.isOpen = this.showPicker, 200);

        if (this.control) {
            this.control.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                next: (value: string) => {
                    if (!value) {
                        this.selectedMonth = (new Date().getMonth() + 1);
                    }
                }
            });
        }
    }

    onChanged: any = () => { };
    onTouched: any = () => { };
    onValidationChange: any = () => { };

    writeValue(object: any): void {
        if (object !== undefined) {
            this.formControlDirective.valueAccessor!.writeValue(object);
        }
    }

    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor!.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor!.registerOnTouched(fn);
    }

    setDisabledState?(isDisabled: boolean): void {
        this.formControlDirective.valueAccessor!.setDisabledState!(isDisabled);
    }

    selectMonth(month: number): void {
        this.selectedMonth = Number(month);
        this.isOpen = false;
        this.control.patchValue(this.formatMonthYear());
    }

    selectYear(event: any): void {
        this.selectedYear = Number(event.target.value);

        if (this.control.value) {
            this.control.patchValue(this.formatMonthYear());
        }
    }

    incrementYear(): void {
        if (this.selectedYear === this.years[this.years.length - 1]) {
            return;
        }

        this.selectedYear++;
        this.yearDropDownFormControl.patchValue(this.selectedYear);
    }

    decrementYear(): void {
        if (this.selectedYear === this.years[0]) {
            return;
        }

        this.selectedYear--;
        this.yearDropDownFormControl.patchValue(this.selectedYear);
    }

    toggle(): void {
        this.isOpen = !this.isOpen;
    }

    onOutsideClick(value: boolean) {
        if (value === false) {
            this.isOpen = false;
        }
    }

    isCurrentMonthActive(month: number): string {
        if (this.selectedMonth === month && !this.control.value) {
            return 'highlight';
        }

        if (this.selectedMonth === month && this.control.value) {
            return 'active';
        }

        return '';
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next(null);
        this.ngUnsubscribe.complete();
    }

    private generateMonths(): void {
        const months: {
            value: number;
            name: string;
        }[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            .map((month: string, index: number) => {
                const item: {
                    value: number;
                    name: string;
                } = {
                    value: (index + 1),
                    name: month
                };

                return item;
            });

        this.splitMonths(months, 3);
    }

    private generateYears(): void {
        for (let index: number = this.startYear; index <= this.endYear; index++) {
            this.years.push(this.startYear);
            this.startYear++;
        }
    }

    private splitMonths(months: any, part: any): void {
        this.months = [];

        while (months.length > 0) {
            const splittedMonths: any = months.splice(months, part);
            this.months.push(splittedMonths);
        }
    }

    private formatMonthYear(): string {
        return `${this.selectedYear}-${this.selectedMonth.toString().padStart(2, '0')}`;
    }
}
