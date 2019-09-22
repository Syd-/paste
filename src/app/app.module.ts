import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewComponent } from './new/new.component';
import { ExistingComponent } from './existing/existing.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasteService } from './services/paste.service';
import { writeURL, readURL } from './shared/urls';
import { ProcessHttpMsgService } from './services/process-http-msg.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewComponent,
    ExistingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    ClipboardModule,
  ],
  providers: [
    PasteService,
    {provide: 'ReadURL', useValue: readURL},
    {provide: 'WriteURL', useValue: writeURL},
    ProcessHttpMsgService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
