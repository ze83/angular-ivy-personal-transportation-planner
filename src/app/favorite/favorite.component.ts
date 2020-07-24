import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Transport } from '../model/transport';
import { Connection } from '../model/connection';
import * as fromRoot from '../app.reducer';
import { TransportService } from '../services/transport.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  
  displayedColumns = ['time', 'journey', 'platform', 'favorite'];
  dataSource = new MatTableDataSource<Connection>();
  resultview = false;
  connectionsSubscription: Subscription;
  constructor(
    private form: FormBuilder,
    private transportService: TransportService,
    private store: Store<fromRoot.State>
  ) {
   }

  ngOnInit() {
    
    this.connectionsSubscription = this.store.select(fromRoot.getFavoriteConnections).subscribe(connections => {
      if(connections !== null) {
        console.log(connections);
        this.dataSource.data = connections;
        this.resultview = true;
      }
    });
    
  }

  removeFavorite(id: string){
    this.transportService.removeFromFavorite(id);
  }

  ngOnDestroy() {
    if(this.connectionsSubscription) {
      this.connectionsSubscription.unsubscribe();
    }
  }

}