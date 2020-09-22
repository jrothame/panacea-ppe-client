export class UberHelper {
  openUber( dropOffLatitude: number,
            dropOffLongitude: number,
            dropOffNickname: string,
            dropOffAddress: string,
            pickupLatitude: number,
            pickupLongitude: number,
            pickupNickname: string,
            pickupAddress: string) {
  //  https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction
  //  https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction#universal-deep-links
  //  Universal links for Uber start with the following URL:    https://m.uber.com/ul/

  // Example:
  /* https://m.uber.com/ul/?
            action=setPickup
            &pickup=my_location
            &dropoff%5Bformatted_address%5D=Uber%20HQ%2C%20Market%20Street%2C%20San%20Francisco%2C%20CA%2C%20USA
            &dropoff%5Blatitude%5D=37.775231
            &dropoff%5Blongitude%5D=-122.417528



  https://m.uber.com/ul/?
          client_id=<CLIENT_ID>
          &action=setPickup
          &pickup[latitude]=37.775818
          &pickup[longitude]=-122.418028
          &pickup[nickname]=UberHQ
          &pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103
          &dropoff[latitude]=37.802374
          &dropoff[longitude]=-122.405818
          &dropoff[nickname]=Coit%20Tower
          &dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133
          &product_id=a1111c8c-c720-46c3-8534-2fcdd730040d
  */
  let url = 'https://m.uber.com/ul/?action=setPickup&pickup=my_location';
  if (dropOffLatitude !== null) {
    url = url + '&dropoff[latitude]=' + dropOffLatitude.toString();
  }
  if (dropOffLongitude !== null) {
    url = url + '&dropoff[longitude]=' + dropOffLongitude.toString();
  }
  if (dropOffNickname !== null) {
    url = url + '&dropoff[nickname]=' + encodeURIComponent(dropOffNickname);
  }
  if (dropOffAddress !== null) {
    url = url + '&dropoff[formatted_address]=' + encodeURIComponent(dropOffAddress);
  }

  if (pickupLatitude !== null) {
    url = url + '&pickup[latitude]=' + pickupLatitude.toString();
  }
  if (pickupLongitude !== null) {
    url = url + '&pickup[longitude]=' + pickupLongitude.toString();
  }
  if (pickupNickname !== null) {
    url = url + '&pickup[nickname]=' + encodeURIComponent(pickupNickname);
  }
  if (pickupAddress !== null) {
    url = url + '&pickup[formatted_address]=' + encodeURIComponent(pickupAddress);
  }

  window.open(url, '_blank');
  }
}
