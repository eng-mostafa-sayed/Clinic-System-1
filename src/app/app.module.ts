import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { PatientsHistoryComponent } from './patients-history/patients-history.component';
import { SharedModule } from './shared/shared.module';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SigninComponent,
    PatientsHistoryComponent,
    LoadingComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    ReactiveFormsModule,
    BrowserModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
