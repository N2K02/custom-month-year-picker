import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomMonthYearPickerComponent } from './my-custom-month-year-picker.component';

describe('myCustomMonthYearPickerComponent', () => {
    let component: MyCustomMonthYearPickerComponent;
    let fixture: ComponentFixture<MyCustomMonthYearPickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyCustomMonthYearPickerComponent]
        });
        fixture = TestBed.createComponent(MyCustomMonthYearPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
