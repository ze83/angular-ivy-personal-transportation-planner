import { PassInfoDialogComponent } from './../../pass-info-dialog/pass-info-dialog.component';
import { Journey } from '../../model/journey';
import { selectTransports } from '../../shared/transport.selectors';
import { Utility } from '../../shared/utility';
import { Connection } from './../../model/connection';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../shared/app.reducer';
import { Subscription } from 'rxjs';
import { TransportActions } from '../../shared/action-types';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from '../../shared/default-dialog-config';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit, OnDestroy {

  @Input() connection: Connection;
  connectionsSubscription: Subscription;
  connections: Connection[];
  isLast = false;
  isErst = false;
  constructor(
    private utility: Utility,
    private store: Store<fromRoot.State>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.connectionsSubscription = this.store.pipe(select(selectTransports)).subscribe(
      connections => this.connections = connections
    );

  }

  convertSecInMin(sec: number) {
    if (sec !== null) {
      return this.utility.convertInMin(sec).toString() + "'";
    }

    return 0;
  }

  skipPrevious() {
    this.connection = this.connections[this.connections.indexOf(this.connection) - 1];
    this.setConnectionSelected();
  }

  skipNext() {
    this.connection = this.connections[this.connections.indexOf(this.connection) + 1];
    this.setConnectionSelected();
  }

  openTrainInfoDialog(journey: Journey) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Train Info: ' + journey.name,
      info: journey
    };

    this.dialog.open(PassInfoDialogComponent, dialogConfig).
    afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  setConnectionSelected() {
    this.store.dispatch(TransportActions.setConnectionId({id: this.connection.id}));
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    switch (this.connections.indexOf(this.connection)) {
      case 0:
        this.isErst = true;
        this.isLast = false;
        break;
      case this.connections.length - 1:
        this.isLast = true;
        this.isErst = false;
        break;
      default:
        this.isLast = false;
        this.isErst = false;
        break;
    }
  }

  ngOnDestroy() {
    if (this.connectionsSubscription) {
      this.connectionsSubscription.unsubscribe();
    }
  }
}
