import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CreateComponent } from './create/create.component';
import { FirstStepComponent } from './createComponents/first-step/first-step.component';
import { SecondStepComponent } from './createComponents/second-step/second-step.component';
import { ThirdStepComponent } from './createComponents/third-step/third-step.component';
import { ReportsComponent } from './reports/reports.component';
import { SecondStepPersonaGiuridicaComponent } from './createComponents/second-step-persona-giuridica/second-step-persona-giuridica.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    CreateComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    ReportsComponent,
    SecondStepPersonaGiuridicaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
