import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: "AIzaSyCRvQrMGfreRm1mugKJsd9dP0YhzIWEbgA",
      authDomain: "scanprocess-c57af.firebaseapp.com",
      databaseURL: "https://scanprocess-c57af.firebaseio.com",
      projectId: "scanprocess-c57af",
      storageBucket: "scanprocess-c57af.appspot.com",
      messagingSenderId: "321369576495"
    };
    firebase.initializeApp(config);

  }
}
