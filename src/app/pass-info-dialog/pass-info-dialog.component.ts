import { Journey } from './../model/journey';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  dialogTitle: string;
  info: Journey;
}

@Component({
  selector: 'app-pass-info-dialog',
  templateUrl: './pass-info-dialog.component.html',
  styleUrls: ['./pass-info-dialog.component.css']
})
export class PassInfoDialogComponent implements OnInit {

  @Input() dialogTitle: string;
  @Input() journey: Journey;
  @Input() modal: HTMLIonModalElement;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  onClose() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
