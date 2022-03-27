let map;

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

	const fenway = { lat: 42.345573, lng: -71.098326 };

	const midden = { lat: 50.5010789, lng: 4.4764595 };
	const map = new google.maps.Map(document.getElementById("map"), {
		center: midden,
		zoom: 8,
	});
	google.maps.event.addListener(map, "click", (event) => {
		addMarker(event.latLng, map);
	});

	const panorama = new google.maps.StreetViewPanorama(
		document.getElementById("pano"),
		{

			position: fenway,
			pov: {
				heading: 34,
				pitch: 10,
			},
		}
	);

	map.setStreetView(panorama);
}


function randomlocation() {

	axios.get('http://localhost:8080/country')
		.then(function(response) {
			let lat = response.data.lat;
			let lng = response.data.lng;


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


		)
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










