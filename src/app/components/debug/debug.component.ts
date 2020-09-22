import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

import { MatDialog } from '@angular/material';

import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import { ActivatedRoute, Router } from '@angular/router';
// import { QrCodeComponentComponent } from '../qr-code-component/qr-code-component.component';
// import { Route } from 'src/app/interfaces/route';



@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  url = '';
  action_type = 'browse';
  selected_building_id = -1;
  
  // start_route: Route;
  // park_route: Route;
  avoid_stairs = true;
  
  // @ViewChild('qrCode', null) qrCode: QrCodeComponentComponent;
  

  constructor(public helper: HelperService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {  
     
    
  }
  



  testUrl() {
    // window.open(this.url, '_blank');
    window.location.href = this.url;
  }

}




























