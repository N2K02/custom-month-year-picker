import { NgModule } from '@angular/core';
import { MyCustomMonthYearPickerComponent } from './my-custom-month-year-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutsideClickDirective } from './outside-click.directive';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        MyCustomMonthYearPickerComponent,
        OutsideClickDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule
    ],
    exports: [
        MyCustomMonthYearPickerComponent
    ]
})
export class MyCustomMonthYearPickerModule { }
