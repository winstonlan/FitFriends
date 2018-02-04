$( document ).ready(function() {
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

	/**
		Function callback when search is clicked. Function will update user preferences
	*/
	document.getElementById("submit").addEventListener("click", function(){

	    let day = document.getElementById("availability").day.value;
	    let startTime = document.getElementById("availability").startTime.value;
	    let endTime = document.getElementById("availability").endTime.value;
		let preference = document.getElementById("availability").preference.value;

		user.dow = day;
		user.start = convertHourToMin(startTime);
		user.end = convertHourToMin(endTime);
		user.pref = preference;

		firebase.database().ref("friends/").once("value").then(function(snapshot) {

			snapshot.forEach(function(childSnapshot) {
				var childData = childSnapshot.toJSON();

				if (childData["avail"].hasOwnProperty(user.dow) &&
					user.start <= childData["avail"][user.dow]["start"] &&
					user.end >= childData["avail"][user.dow]["end"]) {
					user.matches.push(childData);
				}
			});
		}, function(error) {
			console.log("Houston, we have a problem");
			console.log(error);
		});
		console.log(user.matches);
	});

	function convertHourToMin(timeStr) {
		let hour = parseInt(timeStr.substring(0,2));
		let min = parseInt(timeStr.substring(3,5));
		return hour * 60 + min;

	}
});