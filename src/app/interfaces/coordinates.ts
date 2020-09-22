export class Coordinates {

  latitude: number;
  longitude: number;

  populateFromString(coords: string) {
    const arr = coords.split(',');
    this.latitude = Number(arr[0]);
    this.longitude = Number(arr[1]);
  }

  getString(): string {
    return this.latitude.toString() + ',' + this.longitude.toString();
  }
}
