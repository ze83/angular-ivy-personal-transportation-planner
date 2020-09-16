import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Connection } from '../model/connection';
import { Observable } from 'rxjs';
import * as fromRoot from '../shared/app.reducer';
import { areTransportsLoaded } from '../shared/transport.selectors';
import { Update } from '@ngrx/entity';
import { TransportActions } from '../shared/action-types';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  @Input() connections: Connection[];
  @Input() tab: string;
  @Output() openConnection = new EventEmitter();
  selectedRowIndex: string;

  displayedColumns = ['time', 'journey', 'transfers', 'platform', 'favorite'];
  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  }

  editFavoriteValue(connection: Connection, ...params) {
    /**
     * checked = true | false
     * true: add to favorite tab panel
     * false: remove from favorite tab panel
     */
    // console.log(event);
    const newConnection: Connection = {
      ...connection
    };
    console.log(params);
    if (params.length > 0) {
      const event: CustomEvent = params[0];
      newConnection.favorite = event.detail.checked;
      event.stopPropagation();
    } else {
      newConnection.favorite = false;
    }

    const update: Update<Connection> = {
      id: newConnection.id,
      changes: newConnection
    };

    this.store.dispatch(TransportActions.setConnectionFavorited({update}));

    // this.openConnection.emit(newConnection);
  }

  openDetail(connection: Connection) {
    this.store.dispatch(TransportActions.setConnectionId({id: connection.id}));
    this.openConnection.emit();
    this.selectedRowIndex = connection.id;

  }

  highlight(row: Connection) {
    this.selectedRowIndex = row.id;
    console.log(this.selectedRowIndex);
  }



}