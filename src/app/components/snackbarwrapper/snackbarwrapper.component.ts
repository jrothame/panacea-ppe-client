import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbarwrapper',
  templateUrl: './snackbarwrapper.component.html',
  styleUrls: ['./snackbarwrapper.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class SnackbarwrapperComponent implements OnInit {

  timeOut = 3000;
  vertPosition: MatSnackBarVerticalPosition = 'bottom';
  horizPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(public snackBar: MatSnackBar) {}
  

  ngOnInit() {
  }

  public openSnackBar(message: string, className: string) {

      if ( (className === null) || (className.length === 0) ) {
        this.openSnackBarDefault(message);
      }  else {
        this.openSnackBarColor(message, className);
      }

  }


  private openSnackBarDefault(message) {

    this.snackBar.open(message, null, {
      duration: this.timeOut,
      verticalPosition: this.vertPosition,
      horizontalPosition: this.horizPosition
    });
  }
  
  private openSnackBarColor(message: string, className: string) {

    this.snackBar.open(message, null, {
      duration: this.timeOut,
      verticalPosition: this.vertPosition,
      horizontalPosition: this.horizPosition,
      panelClass: [className],
    });


  }

}
