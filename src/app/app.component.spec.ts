import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyCustomMonthYearPickerModule } from '../../projects/my-custom-month-year-picker/src/lib/my-custom-month-year-picker.module';

describe('AppComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [ReactiveFormsModule, MyCustomMonthYearPickerModule]
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
