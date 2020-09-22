export class LyftHelper {
  openLyft( dropOffLatitude: number,
            dropOffLongitude: number,
            dropOffNickname: string,
            dropOffAddress: string,
            pickupLatitude: number,
            pickupLongitude: number,
            pickupNickname: string,
            pickupAddress: string) {
  // https://developer.lyft.com/docs/universal-links
  // tslint:disable-next-line: max-line-length
  // https://lyft.com/ride?id=lyft&pickup[latitude]=37.764728&pickup[longitude]=-122.422999&partner=YOUR_CLIENT_ID&destination[latitude]=37.7763592&destination[longitude]=-122.4242038


  let url = 'https://lyft.com/ride?id=lyft';
  url = url + '&partner=x1ilRwg4AIQO';
  url = url + '&destination[latitude]=' + dropOffLatitude.toString();
  url = url + '&destination[longitude]=' + dropOffLongitude.toString();
  if (pickupLatitude !== null) {
    url = url + '&pickup[latitude]=' + pickupLatitude.toString();
  }
  if (pickupLongitude !== null) {
    url = url + '&pickup[latitude]=' + pickupLongitude.toString();
  }
  window.open(url, '_blank');
  }
}
