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
$( document ).ready(function() {
	/**
		Setup Firebase Database.
	*/

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

	$(".chosen-select").chosen()

	/**
		When search is clicked, function will update user preferences
	*/
	document.getElementById("submit").addEventListener("click", function(){

	    let day = $("#day").val();
	    let startTime = document.getElementById("availability").startTime.value;
	    let endTime = document.getElementById("availability").endTime.value;
		let preference = document.getElementById("availability").preference.value;
		user.dow = day;
		user.start = convertHourToMin(startTime);
		user.end = convertHourToMin(endTime);
		user.matches = [];
		try{
			if(user.start >= user.end) throw "Invalid Time";
		}
		catch(err) {
			alert("Error: Invalid Time Period. Please enter a correct time period");
		}
		user.pref = preference;

		firebase.database().ref("friends/").once("value").then(function(snapshot) {

			snapshot.forEach(function(childSnapshot) {
				var childData = childSnapshot.toJSON();
				for (var i = 0; i < user.dow.length; i++)
				{
					if (childData["avail"].hasOwnProperty(user.dow[i]) &&
					user.start <= childData["avail"][user.dow[i]]["start"] &&
					user.end >= childData["avail"][user.dow[i]]["end"]) 
					{
						user.matches.push(childData);
						break;
					}
				}
			});
		showMatches();
		}, function(error) {
			console.log("Houston, we have a problem");
			console.log(error);
		});
	});

	function convertHourToMin(timeStr) {
		let hour = parseInt(timeStr.substring(0,2));
		let min = parseInt(timeStr.substring(3,5));
		return hour * 60 + min;

	}

	function showMatches() {
		for (var i = 0; i < user.matches.length; i++)
		{
			let name = user.matches[i]["name"];
			let gender = user.matches[i]["gender"] ? "Male" : "Female";
			let phone = user.matches[i]["phone"];
			let pref = user.matches[i]["pref"];

			var html = "";
			html += "<div><h1>" + name + "</h1></div>";
			html += "<div><p>" + gender + "</p></div>";
			if (pref != "none")
				html += "<div><p>Looking for: " + pref + "</p></div>";
			html += "<div><p>Contact me at " + phone + "</p></div>";

			document.getElementById('results').innerHTML = html;

		}

	}
});