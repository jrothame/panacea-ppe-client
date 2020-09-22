import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { SnackbarwrapperComponent } from '../components/snackbarwrapper/snackbarwrapper.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private dialogs: DialogService, private snackBar: SnackbarwrapperComponent) { }

  information(message: string) {
    //this.dialogs.showModalAlert(title, message, 'Ok', '300px', null).subscribe();
    this.snackBar.openSnackBar(message, null);
  }

  warning(message: string) {
    //this.dialogs.showModalAlert(title, message, 'Ok', '300px', null).subscribe();
    this.snackBar.openSnackBar(message, 'yellow-snackbar');
  }

  error(message: string) {
    //this.dialogs.showModalAlert(title, message, 'Ok', '300px', null).subscribe();
    this.snackBar.openSnackBar(message, 'red-snackbar');
  }

  success(message: string) {
    //this.dialogs.showModalAlert(title, message, 'Ok', '300px', null).subscribe();
    this.snackBar.openSnackBar(message, 'green-snackbar');
  }
  

  apiError(title: string, message: string, error: any) {
    console.log(message);
    console.log(error);
    message += '<br/><br/>' + error.message;
    this.dialogs.showModalAlert(title, message, 'Ok', null, null).subscribe();
  }
}
