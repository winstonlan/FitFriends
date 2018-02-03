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
	userGender: "M",
	dow: "mon",
	start: 0,
	end: 1440,
	pref: "none",
	matches: []
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

/**
	Get all the friends in the database, that match with the availability preferences.
*/
function getMatches() {
	console.log(user.dow);
	firebase.database().ref("friends/").once("value").then(function(snapshot) {

		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.toJSON();
			// // Child data contains each of the users individual information.
			if (childData["avail"].hasOwnProperty(user.dow)) {

				console.log(user.start <= childData["avail"][user.dow]["start"]);
				console.log(user.end >= childData["avail"][user.dow]["end"]);
			}

			if (childData["avail"].hasOwnProperty(user.dow) &&
				user.start <= childData["avail"][user.dow]["start"] &&
				user.end >= childData["avail"][user.dow]["end"]) {
				user.matches.push(childData);
				console.log("added")
			}

		});
	});
}

getMatches();
console.log(user.matches);