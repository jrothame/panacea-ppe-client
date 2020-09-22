import { Injectable, EventEmitter, Output } from '@angular/core';
import { SandboxApiService } from './sandbox-api-service';
import { NotificationService } from '../services/notification.service';
import { DialogService } from '../services/dialog.service';
import { UtilityService } from '../services/utility.service';
import { ConfigurationService } from '../services/configuration.service';

// import { AppointmentInfo } from 'src/app/interfaces/appointment-info';
// import { WayfindData } from 'src/app/interfaces/wayfind-data';
import { environment } from 'src/environments/environment';
// import { AppointmentInfo } from '../interfaces/appointment-info';
import { UrlHandler } from '../interfaces/url-handler';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  // public data: WayfindData;
  // public startBrowseData: AppointmentInfo = null;
  public urlHandler: UrlHandler = null;

  @Output() languageChange = new EventEmitter<any>();

  constructor(public api: SandboxApiService,
              public notification: NotificationService,
              public dialog: DialogService,
              public utility: UtilityService,
              public config: ConfigurationService) {
    // this.data = new WayfindData(config);
  }

  toggleLanguage() {
    if (environment.language === 'en') {
      environment.language = 'es';
    } else {
      environment.language = 'en';
    }

    // this.languageChange.emit();

    this.config.load().then(
      (data) => {
        this.languageChange.emit();
      }
    );
  }

  switchLanguage(selected_language: string) {
    environment.language = selected_language;
    this.config.load().then(
      (data) => {
        this.languageChange.emit();
      }
    );
  }

}
