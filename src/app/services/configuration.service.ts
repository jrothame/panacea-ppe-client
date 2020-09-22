import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  labels: any;
  settings: any;

  constructor(protected http: HttpClient) { }

  postUrl:string = "http://localhost:59936/api/Import";
  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  load() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.webapi_url_base + 'configuration/' + environment.language).subscribe(
        data => {
              this.initializeData(data); // = response['value'];
              resolve(true);
        });
    });
  }

  reload(language: string) {
    // return new Promise((resolve, reject) => {
    this.http.get(environment.webapi_url_base + 'configuration/' + language).subscribe(
      data => {
            this.initializeData(data); // = response['value'];
            // resolve(true);
      });
    // });
  }

  initializeData(data: any) {
    this.settings = null;
    this.settings = new Object();
    this.labels = null;
    this.labels = new Object();
    for (const setting of data.settings.settings) {
      this.settings[setting.key] = setting.value;
    }
    for (const group of data.labels.groups) {
      let new_group: any;
      new_group = new Object();
      for (const label of group.labels) {
        new_group[label.key] = label.value;
      }
      this.labels[group.name] = new_group;
    }
    
    environment.tunnelApiCalls = (this.settings.tunnel_api_calls === 'true') ? true : false;

    //  https://github.com/nuxodin/ie11CustomProperties
    //  $('body').css('--menu-bar-background-color-var', this.settings.menu_bar_background_color);

    $('body').css('--menu-bar-background-color-var', this.settings.menu_bar_background_color);
    $('body').css('--menu-bar-color-var', this.settings.menu_bar_color);
    $('body').css('--page-background-color-var', this.settings.page_background_color);
    $('body').css('--primary-color-var', this.settings.custom_primary_color);
    $('body').css('--primary-background-color-var', this.settings.custom_primary_background_color);
  }

  sendData(data:string){
    return this.http.post(this.postUrl, data, this.httpOptions);

  }
 
}
