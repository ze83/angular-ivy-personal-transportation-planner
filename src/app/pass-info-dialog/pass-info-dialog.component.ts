import { Journey } from './../model/journey';
import { Component, OnInit, Inject } from '@angular/core';
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

  dialogTitle: string;
  journey: Journey;
  constructor(
    private dialogRef: MatDialogRef<PassInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogTitle = data.dialogTitle;
    this.journey = data.info;
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

}
