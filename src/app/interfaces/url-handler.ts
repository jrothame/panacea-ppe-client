// import { DestinationItem } from './desination-item';

export class UrlHandler {
  action: string;
  language: string;
  avoidStairs: boolean;
  fromNodeId: number;
  fromDestinationId: number;
  toNodeId: number;
  toDestinationId: number;
  buildingId: number;
  urlItemDelimitter = '_';

  constructor() { }

  // FORMAT
  // ActionEnumeration-BuildingId-StartDest-StartNode-EndDest-EndNode-AvoidStairs-Language-OpenFromEnumeration-LinkCreatedBy-

  // setData(buildingId: number, fromItem: DestinationItem, toItem: DestinationItem, avoidStairs: boolean, language: string) {
  //   this.buildingId = buildingId;
  //   this.avoidStairs = avoidStairs;
  //   this.language = language;
  //   this.fromDestinationId = fromItem.destinationId;
  //   this.fromNodeId = fromItem.nodeId;
  //   this.toDestinationId = toItem.destinationId;
  //   this.toNodeId = toItem.nodeId;
  // }

  getUrl(baseUrl: string): string {
    // return 'bonsai';
    let url = '?b' + this.urlItemDelimitter;
    if (!this.isNullOrUndefined(this.buildingId)) {
      url += this.buildingId.toString();
    }
    url += this.urlItemDelimitter;
    if (!this.isNullOrUndefined(this.fromDestinationId)) {
      url += this.fromDestinationId.toString();
    }
    url += this.urlItemDelimitter;
    if (!this.isNullOrUndefined(this.fromNodeId)) {
      url += this.fromNodeId.toString();
    }
    url += this.urlItemDelimitter;
    if (!this.isNullOrUndefined(this.toDestinationId)) {
      url += this.toDestinationId.toString();
    }
    url += this.urlItemDelimitter;
    if (!this.isNullOrUndefined(this.toNodeId)) {
      url += this.toNodeId.toString();
    }
    url += this.urlItemDelimitter;
    if (!this.isNullOrUndefined(this.avoidStairs)) {
      url += this.avoidStairs ? '1' : '0';
    }
    url += this.urlItemDelimitter;
    if (!this.isNullOrUndefinedOrEmpty(this.language)) {
      url += this.language;
    }
    return baseUrl + url;
  }

  populateFromUrl(url: string) {
    let params: string[] = new Array();
    params = url.split(this.urlItemDelimitter);
    if (params.length > 0) {
      this.action = params[0];
    }
    if (params.length > 1) {
      this.buildingId = Number.parseInt(params[1], 10);
    }
    if (params.length > 2) {
      this.fromDestinationId = Number.parseInt(params[2], 10);
    }
    if (params.length > 3) {
      this.fromNodeId = Number.parseInt(params[3], 10);
    }
    if (params.length > 4) {
      this.toDestinationId = Number.parseInt(params[4], 10);
    }
    if (params.length > 5) {
      this.toNodeId = Number.parseInt(params[5], 10);
    }
    if (params.length > 6) {
      if (params[6] === '1') {
        this.avoidStairs = true;
      } else {
        this.avoidStairs = false;
      }
    }
    if (params.length > 7) {
      this.language = params[7];
    }
  }
  //  https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
  cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ('0' + Number(n).toString(16)).substr(-2);
    // tslint:disable-next-line: no-bitwise
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
  }

  decipher = salt => {
      const textToChars = text => text.split('').map(c => c.charCodeAt(0));
      // tslint:disable-next-line: no-bitwise
      const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
      return encoded => encoded.match(/.{1,2}/g)
          .map(hex => parseInt(hex, 16))
          .map(applySaltToChar)
          .map(charCode => String.fromCharCode(charCode))
          .join('');
  }

  testEncryption() {
    const myCipher = this.cipher('mySecretSalt');

    // Then cipher any text:
    const encrypted = myCipher('the secret string');  // --> "7c606d287b6d6b7a6d7c287b7c7a61666f"

    // To decipher, you need to create a decipher and use it:
    const myDecipher = this.decipher('mySecretSalt');
    const decrypted = myDecipher('7c606d287b6d6b7a6d7c287b7c7a61666f');
    alert('made it!!!');
  }

  isNullOrUndefinedOrEmpty(value: string): boolean {
    return this.isNullOrUndefined(value) || (value.trim().length === 0);
  }

  isNullOrUndefined(value: any): boolean {
    return (value === null) || (value === undefined);
  }

}

enum LinkAction {
  Browse = 1,
  Appointment = 2
}
