import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MyCustomMonthYearPickerComponent } from './my-custom-month-year-picker.component';
import { MyCustomMonthYearPickerModule } from './my-custom-month-year-picker.module';

describe('myCustomMonthYearPickerComponent', () => {
    let component: MyCustomMonthYearPickerComponent;
    let fixture: ComponentFixture<MyCustomMonthYearPickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MyCustomMonthYearPickerModule
            ],
            providers: [
                {
                    provide: ControlContainer,
                    useValue: {
                        control: new FormGroup({})
                    }
                }
            ]
        });
        fixture = TestBed.createComponent(MyCustomMonthYearPickerComponent);
        component = fixture.componentInstance;
        component.formControl = new FormControl('');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
