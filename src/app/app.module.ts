import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialsModule } from './modules/angular-materials/angular-materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from './components/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './components/contact/contact.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { PICK_FORMATS } from './shared/date-picker-formate';
import { DatePickerService } from './services/date-picker/date-picker.service';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: DateAdapter, useClass: DatePickerService },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
