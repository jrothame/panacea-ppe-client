export class WazeHelper {
  openWaze(destinationLatitude: number, destinationLongitude: number, startLatitude: number, startLongitude: number) {
    //  https://developers.google.com/waze/deeplinks
    // https://www.waze.com/ul?ll=40.75889500%2C-73.98513100&navigate=yes&zoom=17
    let url = 'https://www.waze.com/ul?ll=' + destinationLatitude.toString() + ',' + destinationLongitude.toString();
    url = url + '&navigate=yes';
    window.open(url, '_blank');
  }
}
