const fastify = require("fastify")();
const path = require("path");

const PORT = process.env.PORT || 3000;

const apiRoute = require("./routes/api");

fastify.post("/api/locate-address", {}, apiRoute);

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "static"),
});

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
