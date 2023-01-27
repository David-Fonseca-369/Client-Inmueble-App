// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  firebase: {
    config: {
      apiKey: 'AIzaSyABx7gxdNHfSbJRkYZVnMyUzjuVUD-lXW8',
      authDomain: 'ecommerce-79855.firebaseapp.com',
      projectId: 'ecommerce-79855',
      storageBucket: 'ecommerce-79855.appspot.com',
      messagingSenderId: '895935910601',
      appId: '1:895935910601:web:bfc46de4c87f5bef0d7318',
    },
  },
  url: 'http://localhost:5000/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
