/**
	Setup Firebase Database.
*/
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

// GLOBAL VARS
var user = {
	userId: "0000",
	userName: "John Doe",
	userGender: "M" 
};

/**
	Write a friend's information to the database.
*/
function writeFriend(fName, fGender, fAvail, fPref, fContact) {
	firebase.database().ref('friends/' + userId).set({
		name: fName,
		gender: fGender,
		availability: fAvail,
		pref: fPref,
		contact: fContact
	});
}


function searchAvailability() {
    let day = document.getElementById("availability").day.value;
    let startTime = document.getElementById("availability").startTime.value;
    let endTime = document.getElementById("availability").endTime.value;

	let startHour = parseInt(startTime.substring(0,2));
	let startMin = parseInt(startTime.substring(3,5));
	let startTotal = startHour * 60 + startMin;

	let endHour = parseInt(endTime.substring(0,2));
	let endMin = parseInt(endTime.substring(3,5));
	let endTotal = endHour * 60 + endMin;

}