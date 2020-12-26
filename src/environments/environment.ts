// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://192.168.225.87:3000/',
  baseUrl: 'http://ec2-13-234-202-221.ap-south-1.compute.amazonaws.com:8080/',
  apiKey: 'AVVcB8jjfmf7eYftCZAdiyFzAyMnrVLO',
  getAdressBaseUrl: 'https://api.tomtom.com/search/2/reverseGeocode/',
  getLatitudeLongitudeBaseUrl: 'https://api.tomtom.com/search/2/structuredGeocode.json?countryCode=IN&limit=1&streetName='
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
