import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-lost-instructions-modal',
  templateUrl: './lost-instructions-modal.component.html',
  styleUrls: ['./lost-instructions-modal.component.css']
})
export class LostInstructionsModalComponent implements OnInit {

  constructor(public helper: HelperService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<LostInstructionsModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close(null);
  }

}
