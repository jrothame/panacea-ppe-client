import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { LanguageModalComponent } from 'src/app/components/language-modal/language-modal.component';
import { LostInstructionsModalComponent } from 'src/app/components/lost-instructions-modal/lost-instructions-modal.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  ,
  styles: ['menu_bar2 { background-color: red;}']
})
export class NavbarComponent implements OnInit {

  wayfinding = true;
  showDebugMenu = false;

  constructor(public helper: HelperService, private dialog: MatDialog) { }

  ngOnInit() {
    this.showDebugMenu = this.helper.utility.evaluateBooleanString(this.helper.config.settings.enable_debug_menu);
  }

  changeLanguage() {
    // this.helper.toggleLanguage();

    const dialogConfig = this.helper.dialog.getDefaultModalDialogConfig('300px', null);
    dialogConfig.data = {

    };
    const dialogRefClose = this.dialog.open(LanguageModalComponent, dialogConfig);
    dialogRefClose.afterClosed().subscribe(
      (data) => {
        if (data !== null) {

        }
      }
    );

  }

  iAmLost() {
    const dialogConfig = this.helper.dialog.getDefaultModalDialogConfig('100%', '100%');
    dialogConfig.data = {};
    const dialogRefClose = this.dialog.open(LostInstructionsModalComponent, dialogConfig);
    dialogRefClose.afterClosed().subscribe(
      (data) => {
        if (data !== null) {

        }
      }
    );

  }

}
