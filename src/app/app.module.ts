import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule,ButtonModule  } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { AddEditNettingComponent } from './add-edit-netting/add-edit-netting.component';
@NgModule({
  declarations: [
    AppComponent,
    AddEditNettingComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    ButtonModule,
    CheckBoxModule,
    TextBoxModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
