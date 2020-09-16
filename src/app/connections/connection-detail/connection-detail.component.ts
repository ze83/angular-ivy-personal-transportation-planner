import { selectCurrentConnection } from '../../shared/transport.selectors';
import { Connection } from '../../model/connection';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromRoot from '../../shared/app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.css']
})
export class ConnectionDetailComponent implements OnInit {


  @Output() onClose = new EventEmitter();

  connection$: Observable<Connection>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.connection$ = this.store.pipe(select(selectCurrentConnection));
  }

  close() {
    this.onClose.emit();
  }


}
