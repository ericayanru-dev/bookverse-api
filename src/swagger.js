const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
  info: {
    title: "BookVerse API",
    description: "Description",
  },
  host: process.env.SWAGGER_HOST || "localhost:5000",
};

const outputFile = "./swagger/swagger.json";
const routes = ["./app.js", "./server.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
