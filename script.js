var config = {
    apiKey: "AIzaSyDfm9YsOktUVw29r1V1g19-E9VDUhKDOik",
    authDomain: "fitfriends-5d536.firebaseapp.com",
    databaseURL: "https://fitfriends-5d536.firebaseio.com",
    projectId: "fitfriends-5d536",
    storageBucket: "fitfriends-5d536.appspot.com",
    messagingSenderId: "294476758109"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var userId = "helloWorld";

function writeUserData() {
  firebase.database().ref('friends/' + userId).set({
    name: "John Doe",
    gender: "M",
    availability: "bleh",
    pref: "ANYTHING",
    contact: "123456789"
  });
}

writeUserData();