import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBJBtyl2MCs2aS2qv-colMskrlruXwk7lE",
    authDomain: "node-react-dev-196012.firebaseapp.com",
    databaseURL: "https://node-react-dev-196012.firebaseio.com",
    projectId: "node-react-dev-196012",
    storageBucket: "node-react-dev-196012.appspot.com",
    messagingSenderId: "528651335647"
  };

firebase.initializeApp(config);

export default firebase;
export const storage = firebase.storage();