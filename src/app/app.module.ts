import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MaterialModule } from './material.module';
import { TransportService } from './services/transport.service';
import { TransportsComponent } from './transports/transports.component';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports:      [ 
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    StoreModule.forRoot(reducers)],
  declarations: [ 
    AppComponent, 
    HelloComponent, 
    TransportsComponent,
    SearchComponent,
    FavoriteComponent ],
  providers: [TransportService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
