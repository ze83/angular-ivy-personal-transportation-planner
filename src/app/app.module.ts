import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './shared/app.reducer';
import { NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { TransportService } from './services/transport.service';
import { TransportEffects } from './shared/transport.effects';
import { Utility } from './shared/utility';
import { TransportsComponent } from './transports/transports.component';
import { ConnectionDetailComponent } from './connections/connection-detail/connection-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { environment } from '../environments/environment';
import { SectionsComponent } from './connections/sections/sections.component';
import { PassInfoDialogComponent } from './pass-info-dialog/pass-info-dialog.component';



@NgModule({
  imports:      [ 
    IonicModule.forRoot(),
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    StoreModule.forRoot(
      reducers,
      {
        metaReducers,
        runtimeChecks : {
            strictStateImmutability: true,
            strictActionImmutability: true,
            strictActionSerializability: true,
            strictStateSerializability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([TransportEffects])
  ],
  declarations: [ 
    AppComponent, 
    HelloComponent, 
    TransportsComponent,
    ConnectionDetailComponent,
    SectionsComponent,
    PassInfoDialogComponent
    ],
  entryComponents: [PassInfoDialogComponent],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'it-IT'}, TransportService, Utility, DatePipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
