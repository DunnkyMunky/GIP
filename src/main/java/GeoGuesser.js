let map;
let markers = [];
let alglat;
let alglng;
let algpanorama;
let randomcountry;
let markercountry;
var score = 0;
var aantal = 1;
let algTimer;
let algtimeleft;
let afstand;
let totalscore;
let algusername;
let alggamename;

var WelcomeSound = new Audio("geoguesserSoundsAndVideos/welcome.mp4");
WelcomeSound.volume = 0.25;
var MenuSound = new Audio("geoguesserSoundsAndVideos/earthmusic.mp4");
MenuSound.volume = 0.2;
var HoverSound = new Audio("geoguesserSoundsAndVideos/hover.mp4");
HoverSound.volume = 0.2;
var WhooshSound = new Audio("geoguesserSoundsAndVideos/whoosh.mp4");
WhooshSound.volume = 0.3;
var WarpSound = new Audio("geoguesserSoundsAndVideos/warp.mp4");
WarpSound.volume = 0.2;
var TimerSound = new Audio("geoguesserSoundsAndVideos/timer.wav");
TimerSound.volume = 0.4;
var CorrectSound = new Audio("geoguesserSoundsAndVideos/correct.mp4");
CorrectSound.volume = 0.3;
var WrongSound = new Audio("geoguesserSoundsAndVideos/wrong.mp4");
WrongSound.volume = 0.25;
var WinnerSound = new Audio("geoguesserSoundsAndVideos/winner.mp4");

const sv = new google.maps.StreetViewService();

document.getElementById("guess").disabled = true;

function sounds() {

	var playBtn = document.getElementById('play')
	var lobbyBtn = document.getElementById('lobby')
	var settingsBtn = document.getElementById('settings')
	var backBtn = document.getElementById('back')

	playBtn.addEventListener('mouseover', function() {
		HoverSound.play();
	}, false);

	playBtn.addEventListener('mouseleave', function() {
		HoverSound.pause();
		HoverSound.currentTime = 0;
	}, false);

	settingsBtn.addEventListener('mouseover', function() {
		HoverSound.play();
	}, false);

	settingsBtn.addEventListener('mouseleave', function() {
		HoverSound.pause();
		HoverSound.currentTime = 0;
	}, false);

	lobbyBtn.addEventListener('mouseover', function() {
		HoverSound.play();
	}, false);

	lobbyBtn.addEventListener('mouseleave', function() {
		HoverSound.pause();
		HoverSound.currentTime = 0;
	}, false);

	backBtn.addEventListener('mouseover', function() {
		HoverSound.play();
	}, false);

	backBtn.addEventListener('mouseleave', function() {
		HoverSound.pause();
		HoverSound.currentTime = 0;
	}, false);

}

function login() {
	MenuSound.play();
	WelcomeSound.play();
	document.getElementById("loginmenu").style.display = "block";
	document.getElementById("login").style.display = "none";
}

function createaccount() {

	randomid = Math.floor(Math.random() * 100000);

	var username = document.getElementById("loginbox");
	var usernameoutput = document.getElementById("usernamevalue");
	usernameoutput.innerHTML = username.value;
	var password = document.getElementById("passwordbox").value;

	axios.get('http://localhost:8080/login?userID=' + randomid + '&username=' + username.value + '&password=' + password)
		.then(function(response) {
			speler1 = response.data.speler1;
			user1 = username.value;

			if (response.data.user == "error" || response.data.password == "error" && response.data.correct == 0) {

				document.getElementById("loginerror").style.display = "block";

			} else if (response.data.correct == 1) {
				document.getElementById("mainmenu").style.display = "block";
				document.getElementById("loginmenu").style.display = "none";
				document.getElementById("usernamevalue").style.display = "block";
				document.getElementById("loginerror").style.display = "none";
				algusername = username.value;

			} else {

				document.getElementById("mainmenu").style.display = "block";
				document.getElementById("loginmenu").style.display = "none";
				document.getElementById("usernamevalue").style.display = "block";
				document.getElementById("loginerror").style.display = "none";

			}
		})
	username.oninput = function() {
		usernameoutput.innerHTML = this.value;
	}
}

const rooms = [];
function createroom() {

	randomid = Math.floor(Math.random() * 100000);
	gamename = document.getElementById("roomnamevalue");

	var ul = document.getElementById("roomlist");
	var li = document.createElement("li");
	var btn = document.createElement("button");

	document.getElementById("roomlist").style.display = "block";

	axios.get('http://localhost:8080/createroom?gameid=' + randomid + '&gamename=' + gamename.value + '&user=' + algusername)
		.then(function(response) {

			alggamename = gamename.value;

			li.appendChild(document.createTextNode(gamename.value));
			li.appendChild(btn);
			ul.appendChild(li);
			btn.classList.add("joinbutton");
			btn.innerText = "Join";
			ul.appendChild(btn);

			refresh();
		})
	backlobby();
}

function refresh() {

	const rooms = [];

	var ul = document.getElementById("roomlist");
	document.getElementById("roomlist").style.display = "block";

	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}

	axios.get('http://localhost:8080/room')
		.then(function(response) {

			for (let i = 0; i < response.data.length; i++) {

				var li = document.createElement("li");
				var btn = document.createElement("button");

				rooms.push(response.data[i].gamename)

				li.appendChild(document.createTextNode(rooms[i]));
				li.appendChild(btn);
				ul.appendChild(btn);
				ul.appendChild(li);
				btn.classList.add("joinbutton");
				btn.innerText = "Join";
			}
		})
}

function play() {

	setTimeout(randomlocation, 2800);
	document.getElementById("jupiter").style.display = "none";
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById('earth').style.animation = "zoom 3s 1";
	WarpSound.play();

}

function settings() {
	document.getElementById("jupiter").style.display = "block";
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById('earth').style.animation = "leftrightearth 0.5s ";
	document.getElementById('jupiter').style.animation = "rightleftjup 0.5s ";
	document.getElementById("earth").style.filter = "blur(10px)";
	document.getElementById("jupiter").style.filter = "blur(10px) brightness(50%)";
	WhooshSound.play();

	setTimeout(() => {
		document.getElementById("settingsmenu").style.display = "block";
		document.getElementById("earth").style.filter = "blur(0px)";
		document.getElementById("jupiter").style.filter = "blur(0px) brightness(50%)";

	}, 500);
}

function lobby() {
	document.getElementById("jupiter").style.display = "block";
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById('earth').style.animation = "leftrightearth 0.5s ";
	document.getElementById('jupiter').style.animation = "rightleftjup 0.5s ";
	document.getElementById("earth").style.filter = "blur(10px)";
	document.getElementById("jupiter").style.filter = "blur(10px) brightness(50%)";
	WhooshSound.play();

	setTimeout(() => {
		document.getElementById("lobbymenu").style.display = "block";
		document.getElementById("earth").style.filter = "blur(0px)";
		document.getElementById("jupiter").style.filter = "blur(0px) brightness(50%)";

	}, 500);
}

function room() {

	document.getElementById("roommenu").style.display = "block";

}

var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("slidervalue1");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
	output1.innerHTML = this.value;
}

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("slidervalue2");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
	output2.innerHTML = this.value;
}

function back() {
	document.getElementById("earth").style.display = "block";
	document.getElementById("lobbymenu").style.display = "none";
	document.getElementById("settingsmenu").style.display = "none";
	document.getElementById('earth').style.animation = "rightleftearth 0.5s ";
	document.getElementById('jupiter').style.animation = "leftrightjup 0.5s ";
	document.getElementById("earth").style.filter = "blur(5px)";
	document.getElementById("jupiter").style.filter = "blur(5px) brightness(50%)";
	document.getElementById("roommenu").style.display = "none";
	document.getElementById("roomlist").style.display = "none";
	WhooshSound.play();

	setTimeout(() => {
		document.getElementById("jupiter").style.display = "none";
		document.getElementById("mainmenu").style.display = "block";
		document.getElementById("earth").style.filter = "blur(0px)";
		document.getElementById("jupiter").style.filter = "blur(0px) brightness(50%)";

	}, 490);
}

function backlobby() {

	document.getElementById("jupiter").style.display = "block";
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById("lobbymenu").style.display = "block";
	document.getElementById("roommenu").style.display = "none";

}

function countdown() {

	let timeleft = slider1.value;
	let Timer = setInterval(function() {
		algtimeleft = timeleft;

		if (timeleft <= 11) {

			TimerSound.play();
			document.getElementById("countdown").style.animation = "alarm 1s infinite";
			document.getElementById("countdown").innerHTML = timeleft;

		} if (timeleft <= 0) {
			
			TimerSound.pause();
			TimerSound.currentTime = 0;
			clearInterval(Timer);
			randomlocation();
			document.getElementById("countdown").innerHTML = timeleft;
			document.getElementById("countdown").style.animation = "none 1s infinite";

		} else {

			document.getElementById("countdown").innerHTML = timeleft;

		}
		timeleft -= 1;
		
	}, 1000);
	algTimer = Timer;
}

function randomlocation() {
	var rounds = slider2.value;
	document.getElementById("earth").style.display = "none";
	document.getElementById("main").style.display = "block";
	MenuSound.pause();
	MenuSound.currentTime = 0;
	TimerSound.pause();
	TimerSound.currentTime = 0;
	countdown();
	document.getElementById('rounds').innerHTML = "Round " + aantal + "/" + rounds;

	if (aantal > rounds) {

		document.getElementById("main").style.display = "none";
		document.getElementById("pano").style.display = "none";
		document.getElementById("end").style.display = "block";
		document.getElementById("finalscore").innerHTML = "Congratulations! You have " + totalscore + " points";
		clearInterval(algTimer);
		WinnerSound.play();

	}
	aantal++

	axios.get('http://localhost:8080/country')
		.then(function(response) {
			let lat = response.data.lat;
			alglat = lat;
			let lng = response.data.lng;
			alglng = lng;
			var location = new google.maps.LatLng({ lat: lat, lng: lng })

			sv.getPanorama({
				location: location, radius: 100,
			})
				.then(processSVData)
				.catch((e) =>
					console.error("Nieuwe locatie"),
					sv.getPanorama({ location: location, radius: 1000000, })
						.then(processSVData)
				)

			const geocoder = new google.maps.Geocoder();
			const midden = { lat: 0, lng: 0 };
			const map = new google.maps.Map(document.getElementById("map"), {
				disableDefaultUI: true,
				center: midden,
				zoom: 1,
			});

			google.maps.event.addListener(map, "click", (event) => {
				deleteMarker(event.latLng, map);
				addMarker(event.latLng, map);
				document.getElementById("guess").disabled = false;

			});

			geocoder
				.geocode({ location: location })
				.then((response) => {
					if (response.results[0]) {

						var filtered_array = response.results[0].address_components.filter(function(address_component) {
							return address_component.types.includes("country");
						});
						var country = filtered_array.length ? filtered_array[0].long_name : "";
						randomcountry = country;

					} else {
						window.alert("No results found");
					}

				})
				.catch((e) => window.alert("Geocoder failed due to: " + e));


			const locatie = { lat: lat, lng: lng };

			const panorama = new google.maps.StreetViewPanorama(
				document.getElementById("pano"),

				{
					disableDefaultUI: true,
					showRoadLabels: false,
					position: locatie,
					pov: {
						heading: 34,
						pitch: 10,
					},

				},

			)

			algpanorama = panorama;
			map.setStreetView(panorama);

		}
		)
}

function addMarker(location, map) {
	const geocoder = new google.maps.Geocoder();
	const marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markers.push(marker);

	axios.get('http://localhost:8080/afstand?lat=' + alglat + '&lng=' + alglng + '&lat2=' + location.lat() + '&lng2=' + location.lng())
		.then(function(response) {
			kmafstand = response.data / 1000;
			afstand = Math.round(kmafstand);

		})

	geocoder
		.geocode({ location: location })
		.then((response) => {
			if (response.results[0]) {

				var filtered_array = response.results[0].address_components.filter(function(address_component) {
					return address_component.types.includes("country");
				});
				var country = filtered_array.length ? filtered_array[0].long_name : "";
				console.log("we zitten in " + country);
				markercountry = country;

			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));
}

function setMapOnAll(map) {
	for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function hideMarkers() {
	setMapOnAll(null);
}

function deleteMarker() {
	hideMarkers();
	markers = [];
}

function scoresystem() {
	reflow();

	if (randomcountry == markercountry) {
		score = score + 200;
		document.getElementById('score').innerHTML = "score: " + score;
		document.getElementById('scorecountry').innerHTML = "country + 200";
		document.getElementById('scorecountry').style.animation = "fade 4.10s";
		CorrectSound.play();

	} else {
		score = score;
		document.getElementById('score').innerHTML = "score: " + score;
		WrongSound.play();

	}

	if (afstand < 2500) {
		kmscore = Math.round(100000 / afstand);
		score = score + kmscore
		document.getElementById('score').innerHTML = "score: " + score;
		document.getElementById('scoredistance').innerHTML = "distance + " + kmscore;
		document.getElementById('scoredistance').style.animation = "fade 2.80s";

	}

	if (algtimeleft >= 12 && randomcountry == markercountry) {
		timescore = Math.round(algtimeleft / 0.1);
		score = score + timescore;
		document.getElementById('score').innerHTML = "score: " + score;
		document.getElementById('scoretime').innerHTML = "timebonus + " + timescore;
		document.getElementById('scoretime').style.animation = "fade 3.70s";
	}

	if (score > 10000000) {
		WinnerSound.play();

	}
	totalscore = score;

}


function guess() {
	document.getElementById("guess").disabled = true;

	console.log("random country: " + randomcountry)
	console.log("marker country: " + markercountry)

	scoresystem();
	TimerSound.pause();
	TimerSound.currentTime = 0;
	clearInterval(algTimer);
	randomlocation();

}


function gomenu() {
	document.getElementById('earth').style.animation = "none";
	MenuSound.play();
	aantal = 0;
	totalscore = 0;
	document.getElementById("earth").style.display = "block";
	document.getElementById("mainmenu").style.display = "block";
	document.getElementById("end").style.display = "none";
	WinnerSound.pause();
	WinnerSound.currentTime = 0;

}

function processSVData({ data }) {
	const location = data.location;
	algpanorama.setPano(location.pano);
	algpanorama.setPov({
		heading: 270,
		pitch: 0,
	});
	algpanorama.setVisible(true);

}

function reflow() {
	//	reflow scorecountry animation
	var reflow1 = document.getElementById('scorecountry');
	reflow1.style.animation = 'none';
	//triggers reflow
	reflow1.offsetHeight;
	reflow1.style.animation = null;

	//	reflow scoredistance animation	
	var reflow1 = document.getElementById('scoredistance');
	reflow1.style.animation = 'none';
	//triggers reflow
	reflow1.offsetHeight;
	reflow1.style.animation = null;

	//	reflow scoretime animation	
	var reflow1 = document.getElementById('scoretime');
	reflow1.style.animation = 'none';
	//triggers reflow
	reflow1.offsetHeight;
	reflow1.style.animation = null;
}
