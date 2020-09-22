import { Injectable, getModuleFactory } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  isNullOrUndefinedOrEmpty(value: string): boolean {
    return this.isNullOrUndefined(value) || (value.trim().length === 0);
  }

  isNullOrUndefined(value: any): boolean {
    return (value === null) || (value === undefined);
  }

  evaluateBooleanString(value: string): boolean {
    if ((value.toUpperCase() === 'TRUE') || (value === '1')) {
      return true;
    } else {
      return false;
    }
  }

  getOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
    return os;
  }

  getBrowser(): any {
    const ua = window.navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) {
          return {name: tem[1].replace('OPR', 'Opera'), version: tem[2]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = ua.match(/version\/(\d+)/i);
    if (tem != null) {
        M.splice(1, 1, tem[1]);
    }
    return {name: M[0], version: M[1]};
  }

  isMobileDevice() {
    const os = this.getOS();
    if ((os === 'iOS') || (os === 'Android')) {
      return true;
    } else {
      return false;
    }
  }

}
