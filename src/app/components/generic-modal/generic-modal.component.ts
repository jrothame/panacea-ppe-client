import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButtonToggleGroupMultiple } from '@angular/material';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {

  title: string;
  message: string;
  button1_text: string;
  button1_visible = false;
  button2_text: string;
  button2_visible = false;
  button3_text: string;
  button3_visible = false;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<GenericModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
                this.title = data.title;
                this.message = data.message;
                if ((data.button1_text !== null) && (data.button1_text !== undefined)) {
                  this.button1_text = data.button1_text;
                }
                if ((data.button1_visible !== null) && (data.button1_visible !== undefined)) {
                  this.button1_visible = data.button1_visible;
                }

                if ((data.button2_text !== null) && (data.button2_text !== undefined)) {
                  this.button2_text = data.button2_text;
                }
                if ((data.button2_visible !== null) && (data.button2_visible !== undefined)) {
                  this.button2_visible = data.button2_visible;
                }

                if ((data.button3_text !== null) && (data.button3_text !== undefined)) {
                  this.button3_text = data.button3_text;
                }
                if ((data.button3_visible !== null) && (data.button3_visible !== undefined)) {
                  this.button3_visible = data.button3_visible;
                }
              }

  ngOnInit() {

  }

  onClose(button_name: string) {
    this.dialogRef.close(button_name);
  }

}
