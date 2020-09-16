import { Component, VERSION, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import * as fromRoot from './shared/app.reducer';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild('detail', {static: false}) sidenav: MatSidenav;

  title = 'PTP';

  constructor(
    private store: Store<fromRoot.State>
  ) {
    console.log('App component');
    // this.store.select
  }

  openRightNavPanel() {
    this.sidenav.open();
  }

  closeRightNavPanel() {
    this.sidenav.close();
  }

}
