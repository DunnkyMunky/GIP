let map;

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;



google.maps.event.addDomListener(window, 'load', initMap);

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
	

	var location = new google.maps.LatLng({ lat: lat, lng: lng })

	const geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: lat, lng: lng },
		zoom: 12,
	});
	google.maps.event.addListener(map, "click", (event) => {
		addMarker(event.latLng, map);
	});
	geocoder
		.geocode({ location: location })
		.then((response) => {
			if (response.results[0]) {


				var filtered_array = response.results[0].address_components.filter(function(address_component) {
					return address_component.types.includes("country");
				});
				var country = filtered_array.length ? filtered_array[0].long_name : "";
				console.log("we zitten in " + country);

			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));

	console.log("de coordinaten van deze marker zijn " + location)

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
		.geocode({ location: location })
		.then((response) => {
			if (response.results[0]) {


				var filtered_array = response.results[0].address_components.filter(function(address_component) {
					return address_component.types.includes("country");
				});
				var country = filtered_array.length ? filtered_array[0].long_name : "";
				console.log("we zitten in " + country);

			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));


	console.log("de coordinaten van deze marker zijn " + location)


}

