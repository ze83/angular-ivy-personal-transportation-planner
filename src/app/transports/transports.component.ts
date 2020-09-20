import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TransportService } from '../services/transport.service';
import * as fromRoot from '../shared/app.reducer';
import { Store, State, select } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Connection } from '../model/connection';
import { selectTransports, selectFavoriteTransports, areTransportsLoaded, loading } from '../shared/transport.selectors';
import { TransportActions } from '../shared/action-types';
import { DatePipe } from '@angular/common';
import { Utility } from '../shared/utility';

@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.css']
})
export class TransportsComponent implements OnInit {

 @Output() onConnectionClick = new EventEmitter();

  searchform: FormGroup;
  connections$: Observable<Connection[]>;
  favoritesConnections$: Observable<Connection[]>;
  resultView$: Observable<boolean>;
  loading$: Observable<boolean>;
  connections: Connection[];
  connectionsSubscription: Subscription;
  time: string;
  page = 0;
  selectedIndexTab = 0;
  tab0 = 'normal'; //
  tab1 = 'favorite'; //favorite
  scrollingActivated = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private datepipe: DatePipe,
    private utility: Utility
  ) {
    this.searchform = this.fb.group({
      from: ['Dornach', Validators.required],
      to: ['Zurich', Validators.required],
      datetime: [new Date()],
      time: ''
    });
  }

  ngOnInit() {

    this.connections$ = this.store.pipe(select(selectTransports));
    this.connections$.subscribe(connections => {
      this.connections = connections;
      if (this.scrollingActivated) {
        this.scrollToDown();
      }
    });

    this.favoritesConnections$ = this.store.pipe(select(selectFavoriteTransports));

    this.resultView$ = this.store.pipe(select(areTransportsLoaded));

    this.loading$ = this.store.pipe(select(loading));

    const date = new Date();
    this.time = this.transformTimeFormat(date.toISOString(), 'HH:mm');
    this.searchform.controls.time.setValue(this.time);
    // const time2 = this.datepipe.transform(date, 'y-MM-dd');
    // console.log('now', this.time);
    // console.log('now', time2);
  }

  searchTransports() {
    this.page = 0;
    this.selectedIndexTab = 0;
    this.scrollingActivated = true;
    this.loadConnections();
  }

  loadConnections() {
    // console.log('datetime: ', this.searchform.controls.time.value);
    this.store.dispatch(TransportActions.loadTransportParam(
      {
        transport: {
                    from: this.searchform.controls.from.value,
                    to: this.searchform.controls.to.value,
                    date: this.transformDateFormat(this.searchform.controls.datetime.value),
                    time: this.searchform.controls.time.value,
                    page: this.page
                              // + 'T' + this.searchform.controls.time.value
                  }
      }
    ));
  }

  clearResults() {
    this.searchform.controls.from.reset();
    this.searchform.controls.to.reset();
  }

  openDetail(connection: Connection) {
    this.scrollingActivated = false;
    this.utility.updateAllConnections(this.store, this.connections, connection);
    this.onConnectionClick.emit();
  }

  onScrollingActivation(activated: boolean) {
    this.scrollingActivated = activated;
  }

  loadMoreConnections() {
    this.scrollingActivated = true;
    if (this.page <= 3 ) {
      this.selectedIndexTab = 0;
      this.page += 1;
      this.loadConnections();
    }
  }

  selectedTab(index: number) {
    this.selectedIndexTab = index;
    console.log(this.selectedIndexTab);
  }

   getContent() {
    return document.querySelector('ion-content');
  }

  scrollToDown() {
    console.log('scrollToDown');
    setTimeout(() => {
      if (this.getContent()) {
        this.getContent().scrollToBottom(600);
      }
    }, 500);
  }

  setTime(event: CustomEvent) {
    // console.log(event.detail.value);
    this.searchform.controls.time.setValue(event.detail.value);
  }

  transformTimeFormat(time: string, format: string) {
    return this.datepipe.transform(time, format);
  }

  transformDateFormat(date: string) {
    return this.datepipe.transform(date, 'y-MM-dd');
  }



}