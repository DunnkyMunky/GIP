let map;

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;





function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 40.397, lng: 4.644 },
		zoom: 8,
	});

	google.maps.event.addListener(map, "click", (event) => {
		addMarker(event.latLng, map);
	});
}

function randomlocation() {
	let lat = Math.random() * (90 - (-90)) + -90;
	let lng = Math.random() * (180 - (-180)) + -180;


	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: lat, lng: lng },
		zoom: 12,
	});
	google.maps.event.addListener(map, "click", (event) => {
		addMarker(event.latLng, map);
	});

	console.log("de lat is " + lat + " en de lng is " + lng);
	console.log("we zitten in ");

}


function addMarker(location, map) {
	const geocoder = new google.maps.Geocoder();
	new google.maps.Marker({
		position: location,
		label: labels[labelIndex++ % labels.length],
		map: map
	});




	console.log("De lat is " + location.lat() + " de lng is " + location.lng())


	geocoder
		.geocode({ location: location.latlng })
		.then((response) => {
			if (response.results[0]) {
				map.setZoom(11);

				const marker = new google.maps.Marker({
					position: location.latlng,
					map: map,

				});

				infowindow.setContent(response.results[0].formatted_address);
				infowindow.open(map, marker);
			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));
		
		

	console.log("DIT ZIJN DE RESULTS " + location[0]);

	console.log("dit is ");

	console.log("de coordinaten van deze marker zijn " + location)


}

