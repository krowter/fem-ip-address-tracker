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

exports.handleApiRequest = (req, res) => {
  if (req.url === "/api/locate-address" && req.method === "GET") {
    req.on("data", async (chunk) => {
      const requestBody = JSON.parse(String(chunk));

      const { ipAddress } = requestBody;

      if (!ipAddress) {
        res.writeHead(401);
        res.end("Request body must contain valid IP address");
      } else {
        const ipLocation = await getIpLocation(ipAddress);

        res.writeHead(200);
        res.end(ipLocation);
      }
    });
  }
};
