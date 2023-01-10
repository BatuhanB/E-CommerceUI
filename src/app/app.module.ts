import { UiModule } from './ui/ui.module';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    UiModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    {
      provide: 'baseUrl',
      useValue: 'https://localhost:7153/api',
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
