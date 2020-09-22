import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProcesssingModalComponent } from 'src/app/components/processsing-modal/processsing-modal.component';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public processingDialog = null;

  constructor(private matDialog: MatDialog) { }

  getDefaultModalDialogConfig(width: string, height: string): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    if (width != null) {
      dialogConfig.width = width;
      dialogConfig.maxWidth = width;
    }
    // if (width === '100vw') {
    //   dialogConfig.maxWidth = '95vw';
    // }
    if (height != null) {
      dialogConfig.height = height;
    }
    return dialogConfig;
  }

  showProcessingModal() {
    if (this.processingDialog != null) {
      return;
    }
    const dialogConfig = this.getDefaultModalDialogConfig(null, null);
    dialogConfig.data = { };
    dialogConfig.panelClass = 'transparent';
    this.processingDialog = this.matDialog.open(ProcesssingModalComponent, dialogConfig);
  }

  hideProcessingModal() {
    if (this.processingDialog != null) {
      this.processingDialog.close();
      this.processingDialog = null;
    }
  }

  showModalAlert(title: string, message: string, button1_text: string, width: string, height: string): Observable<any> {
    // const destParam: DestinationItem = new DestinationItem();
    // destParam.name = destinationItem.name;
    // destParam.nodeId = destinationItem.nodeId;

    // const dialogConfig = this.helper.dialog.getDefaultModalDialogConfig('100%', '100%');
    // dialogConfig.data = {
    //   selectedBuilding: this.selected_building,
    //   currentDestination: destParam
    // };
    // const dialogRefClose = this.dialog.open(DestinationSelectorModalComponent, dialogConfig);
    // dialogRefClose.afterClosed().subscribe(
    //   (data) => {
    //     if (data !== null) {
    //       destinationItem.nodeId = data.nodeId;
    //       destinationItem.name = data.name;
    //     }
    //   }
    // );
    const dialogConfig = this.getDefaultModalDialogConfig(width, height);
    dialogConfig.data = {
      title,
      message,
      button1_text,
      button1_visible: true
    };
    const dialogRefClose = this.matDialog.open(GenericModalComponent, dialogConfig);
    return dialogRefClose.afterClosed();
  }


}
