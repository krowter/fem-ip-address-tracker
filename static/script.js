function getIP(json) {
  fetch("/api/locate-address", {
    method: "POST",
    body: JSON.stringify({
      ipAddress: json.ip,
    }),
  })
    .then((res) => res.json())
    .then((res) => displayMap({ location: res.location }));
}

function displayMap({ location: { lat, lng } }) {
  L.map("mapid", {
    center: [lat, lng],
    zoom: 20,
    layers: [
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
  });
}
