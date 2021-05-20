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
    .then((res) => callback(res));
};

const displayMap = ({ location: { lat, lng } }, zoom = 20) => {
  L.map("map", {
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

const initialDetails = {
  as: {
    name: "First Media",
  },
  ip: "123.123.123.123",
  location: {
    region: "Jakarta",
    timezone: "+07.00",
  },
};

const ipAddressDetailsContainer = document.getElementById("ip-address-details");

const displayCurrentIp = ({ ip }) => {
  const callback = (ipDetails) => {
    displayDetails(
      ipAddressDetailsContainer,
      createIpAddressDetails(ipDetails)
    );

    displayMap(ipDetails);
  };

  getIPDetails(ip, callback);
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const ipAddress = formData.get("address-input");

  displayCurrentIp({ ip: ipAddress });
};
