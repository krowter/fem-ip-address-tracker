require("dotenv").config();
const https = require("https");

const API_KEY = process.env.API_KEY;

const getIpLocation = (ipAddress) => {
  return new Promise((resolve) => {
    https.get(
      `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ipAddress}`,
      (response) => {
        response.on("data", (chunk) => {
          const result = JSON.stringify(JSON.parse(String(chunk)), null, 4);

          resolve(result);
        });
      }
    );
  });
};

module.exports = async (req, res) => {
  console.log("endpoint hit!");
  try {
    const requestBody = JSON.parse(req.body);

    const { ipAddress } = requestBody;
    console.log({ ipAddress });
    if (!ipAddress) {
      res.status(401);
      res.send("Request body must contain valid IP address");
    } else {
      const ipLocation = await getIpLocation(ipAddress);
      console.log({ ipLocation });
      res.status(200);
      res.send(ipLocation);
    }
  } catch (err) {
    console.log(err);
  }
};
