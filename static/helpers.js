const createIpAddressDetails = (details) => [
  {
    title: "IP ADDRESS",
    value: details.ip,
  },
  {
    title: "LOCATION",
    value: details.location.region,
  },
  {
    title: "TIMEZONE",
    value: `UTC ${details.location.timezone}`,
  },
  {
    title: "ISP",
    value: details.as.name,
  },
];

const displayDetails = (container, details) => {
  container.innerHTML = "";

  details.forEach((detail) => {
    const detailElement = document.createElement("div");
    const detailTitle = document.createElement("span");
    const detailValue = document.createElement("span");

    detailElement.classList.add("detail");

    detailTitle.classList.add("detail-title");
    detailTitle.textContent = detail.title;

    detailValue.classList.add("detail-value");
    detailValue.textContent = detail.value;

    detailElement.appendChild(detailTitle);
    detailElement.appendChild(detailValue);
    container.appendChild(detailElement);
  });
};

const getIPDetails = (ip, callback) => {
  fetch("/api/locate-address", {
    method: "POST",
    body: JSON.stringify({
      ipAddress: ip,
    }),
  })
    .then((res) => res.json())
    .then((res) => callback(res))
    .catch(() => alert("Address not found"));
};

const displayMap = (map, { location: { lat, lng } }) => {
  map.setView(L.latLng(lat, lng));
};

const toggleSpinnerVisibility = (spinner, isVisible) => {
  spinner.style.display = isVisible ? "block" : "none";
  spinner.setAttribute("aria-hidden", isVisible);
};

const initMap = (id, { lat, lng }, zoom) => {
  return L.map(id, {
    center: [lat, lng],
    zoom,
    layers: [
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
  });
};

const isIpValid = (ip) => {
  const pattern = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

  return pattern.test(ip);
};
