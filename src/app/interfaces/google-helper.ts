export class GoogleHelper {
  openGoogleNavigation(destinationLatitude: number, destinationLongitude: number, startLatitude: number, startLongitude: number) {
    //   https://developers.google.com/maps/documentation/urls/guide
    //  https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393&query_place_id=ChIJKxjxuaNqkFQR3CK6O1HNNqY
    //  https://developers.google.com/maps/documentation/urls/guide#directions-action


    // let url = 'https://www.google.com/maps/search/?api=1&query=';
    // url = url + this.selectedBuilding.building.latitude + ',' + this.selectedBuilding.building.longitude;
    // window.open(url, '_blank');


    let url = 'https://www.google.com/maps/dir/?api=1';
    url = url + '&destination=' + destinationLatitude + ',' + destinationLongitude;
    if ((startLatitude !== null) && (startLongitude !== null)) {
      url = url + '&origin=' + startLatitude + ',' + startLongitude;
    }
    url = url + '&travelmode=driving';
    url = url + '&dir_action=navigate';
    window.open(url, '_blank');
  }
}
