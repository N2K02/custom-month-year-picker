import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MyCustomMonthYearPickerModule } from "../../projects/my-custom-month-year-picker/src/lib/my-custom-month-year-picker.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MyCustomMonthYearPickerModule
    ]
})
export class AppModule { }
