import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'
import { SplitterModule } from 'primeng/splitter'
import { DividerModule } from 'primeng/divider' 
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http'
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SplitterModule,
    DividerModule,
    AvatarModule,
    TableModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BrowserAnimationsModule,
    MenubarModule,
    BadgeModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
