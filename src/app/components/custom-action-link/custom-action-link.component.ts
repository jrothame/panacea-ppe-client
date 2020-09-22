import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HelperService } from 'src/app/services/helper.service';
import { LanguageModalComponent } from '../language-modal/language-modal.component';

@Component({
  selector: 'app-custom-action-link',
  templateUrl: './custom-action-link.component.html',
  styleUrls: ['./custom-action-link.component.css']
})
export class CustomActionLinkComponent implements OnInit {

  constructor(public helper: HelperService, private dialog: MatDialog) { }

  ngOnInit() {
    
  }

  openLanguageDialog() {
    const dialogConfig = this.helper.dialog.getDefaultModalDialogConfig('80%', '100%');
      dialogConfig.data = {
        
      };
      const dialogRefClose = this.dialog.open(LanguageModalComponent, dialogConfig);
      dialogRefClose.afterClosed().subscribe(
        (data) => {
          if (data !== null) {

            console.log('language returned=' + data);
            
          }
        }
      );
  }

}
