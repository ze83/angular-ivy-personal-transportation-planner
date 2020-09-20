import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Connection } from '../model/connection';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../shared/app.reducer';
import { areTransportsLoaded } from '../shared/transport.selectors';
import { Update } from '@ngrx/entity';
import { TransportActions } from '../shared/action-types';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit, OnDestroy {

  @Input() connections: Connection[];
  @Input() tab: string;
  @Output() openConnection = new EventEmitter();
  @Output() scrollingActivation = new EventEmitter<boolean>();
  selectedRowIndex: string;
  handset = false;
  breakpointSubscription: Subscription;

  displayedColumns = ['time', 'journey', 'transfers', 'platform', 'favorite'];
  constructor(
    private store: Store<fromRoot.State>,
    private breakpointObserver: BreakpointObserver
  ) { 
    this.breakpointSubscription = breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.displayedColumns = ['time', 'favorite'];
        this.handset = true;
      } else {
        this.displayedColumns = ['time', 'journey', 'transfers', 'platform', 'favorite'];
        this.handset = false;
      }
    });
  }

  ngOnInit() {
    if (this.tab === 'favorite') {
      this.connections = this.connections.filter(connection => connection.favorite === true);
    }
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
    this.scrollingActivation.emit(false);
    this.store.dispatch(TransportActions.setConnectionFavorited({update}));
    
  }

  openDetail(connection: Connection) {
    this.store.dispatch(TransportActions.setConnectionId({id: connection.id}));
    this.scrollingActivation.emit(false);
    this.openConnection.emit(connection);
    this.selectedRowIndex = connection.id;

  }

  highlight(row: Connection) {
    this.selectedRowIndex = row.id;
    console.log(this.selectedRowIndex);
  }

  ngOnDestroy() {
    if(this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

}