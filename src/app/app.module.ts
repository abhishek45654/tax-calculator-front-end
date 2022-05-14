import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { CustomMaterialModule } from './core/material.module';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IncomeDataFormComponent } from './income-data-form/income-data-form.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HistoryComponent } from './history/history.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ItemisedDeductionHistoryComponent } from './dialogs/itemised-deduction-history/itemised-deduction-history.component';
import { ResourceLinkComponent } from './resource-link/resource-link.component';
import { BasicInterceptor } from './core/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LoaderComponent,
    HomeComponent,
    IncomeDataFormComponent,
    AlertComponent,
    HistoryComponent,
    ItemisedDeductionHistoryComponent,
    ResourceLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:BasicInterceptor, multi:true},
    LoaderService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
