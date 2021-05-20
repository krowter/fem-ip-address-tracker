const ipAddressDetailsContainer = document.getElementById("ip-address-details");
const spinner = document.getElementById("spinner");
const addressInput = document.getElementById("address-input");

const map = initMap("map", { lat: 0, lng: 0 }, 20);

const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const ipAddress = formData.get("address-input");

  displayCurrentIp({ ip: ipAddress });
};

const displayCurrentIp = ({ ip }) => {
  if (!isIpValid(ip)) {
    alert("Please enter a valid IP address");
    return;
  }

  toggleSpinnerVisibility(spinner, true);
  addressInput.disabled = true;

  const callback = (ipDetails) => {
    toggleSpinnerVisibility(spinner, false);
    addressInput.disabled = false;

    displayDetails(
      ipAddressDetailsContainer,
      createIpAddressDetails(ipDetails)
    );

    displayMap(map, ipDetails);
  };

  getIPDetails(ip, callback);
};
