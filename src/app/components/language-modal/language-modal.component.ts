import { Component, OnInit, Inject } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.css']
})
export class LanguageModalComponent implements OnInit {

  language: string;

  constructor(public helper: HelperService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<LanguageModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
    this.language = environment.language;
  }

  onClose() {
    if (this.language !== environment.language) {
      this.helper.toggleLanguage();
    }
    this.dialogRef.close(null);
  }

}
