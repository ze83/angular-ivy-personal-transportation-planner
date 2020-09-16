import { MatDialogConfig } from '@angular/material/dialog';

export function defaultDialogConfig() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.width = '85%';
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  return dialogConfig;
}
