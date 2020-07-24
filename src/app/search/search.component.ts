import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransportService } from '../services/transport.service';

import { Transport } from '../model/transport';
import { Connection } from '../model/connection';
import { MatTableDataSource } from '@angular/material/table';
import * as fromRoot from '../app.reducer';
import * as fromTransport from '../shared/transport.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{
  searchform: FormGroup;
  displayedColumns = ['time', 'journey', 'platform', 'favorite'];
  dataSource = new MatTableDataSource<Connection>();
  resultview = false;
  connectionsSubscription: Subscription;
  constructor(
    private form: FormBuilder,
    private transportService: TransportService,
    private store: Store<fromRoot.State>
  ) {
    this.searchform = this.form.group({
      from: '',
      to: '',
      datetime: Date
    });
   }

  ngOnInit() {
    
    this.connectionsSubscription = this.store.select(fromRoot.getConnections).subscribe(connections => {
      if(connections !== null) {
        console.log(connections);
        this.dataSource.data = connections;
        this.resultview = true;
      }
    });
    
  }

  searchTransports() {    
    this.transportService.searchTransport(this.searchform.value);
  }

  addToFavorite(checked: boolean, id: string) {
  
    if(checked) {
      this.transportService.addToFavorite(id);
    } else {
      this.transportService.removeFromFavorite(id);
    }
  }

  clearResults() {
    this.searchform.reset();
    this.transportService.clearResults();
  }

  ngOnDestroy() {
    if(this.connectionsSubscription) {
      this.connectionsSubscription.unsubscribe();
    }
  }
}
