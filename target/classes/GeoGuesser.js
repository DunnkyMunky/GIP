let map;

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
let alglat;
let alglng;
let locationrandom;


google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

	const fenway = { lat: 42.345573, lng: -71.098326 };

	const midden = { lat: 0, lng: 0 };
	const map = new google.maps.Map(document.getElementById("map"), {
		center: midden,
		zoom: 1.5,
	});
	google.maps.event.addListener(map, "click", (event) => {
		addMarker(event.latLng, map);
		console.log("de coordinaten van deze marker zijn " + location)

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
			alglat = lat;
			let lng = response.data.lng;
			alglng = lng;


			var location = new google.maps.LatLng({ lat: lat, lng: lng })
			locationrandom = location

			const geocoder = new google.maps.Geocoder();
			const midden = { lat: 0, lng: 0 };
			const map = new google.maps.Map(document.getElementById("map"), {
				center: midden,
				zoom: 1.5,
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

			const locatie = { lat: lat, lng: lng };
			
			// google api latlonglocatie -> stadsnaam

			const panorama = new google.maps.StreetViewPanorama(
				document.getElementById("pano"),

				{

					position: locatie,
					pov: {
						heading: 34,
						pitch: 10,
					},
				}
			);

			map.setStreetView(panorama);
			google.maps.event.addListener(map, "click", (event) => {
				addMarker(event.latLng, map);
			});

			console.log("de coordinaten van deze randompositie zijn " + location)

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

	axios.get('http://localhost:8080/afstand?lat=' + alglat + '&lng=' + alglng + '&lat2=' + location.lat() + '&lng2=' + location.lng())
		.then(function(response) {

			
			

			console.log(locationrandom + " ligt " + response.data + " meter van " + location)
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

			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));

}

