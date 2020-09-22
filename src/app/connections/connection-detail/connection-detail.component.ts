import { selectCurrentConnection } from '../../shared/transport.selectors';
import { Connection } from '../../model/connection';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromRoot from '../../shared/app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.css']
})
export class ConnectionDetailComponent implements OnInit {


  @Output() onClose = new EventEmitter();

  connection$: Observable<Connection>;
  smallhandset = false;
  constructor(
    private store: Store<fromRoot.State>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
    // Breakpoints.Handset
    '(max-width: 359px)'
    ]).subscribe(result => {
      if (result.matches) {
        // this.activateHandsetLayout();
        // console.log('dimensione handset');
        this.smallhandset = true;
      } else {
        this.smallhandset = false;
      }
    });
   }

  ngOnInit() {
    this.connection$ = this.store.pipe(select(selectCurrentConnection));
  }

  close() {
    this.onClose.emit();
  }


}
