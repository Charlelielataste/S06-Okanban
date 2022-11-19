const { Router } = require("express");
const listRouter = require("./listRouter");
const cardRouter = require("./cardRouter");
const tagRouter = require("./tagRouter");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const mainRouter = new Router(); // Objectif : séparer les routeurs de chaque entité dans un fichier différent

mainRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Setup the documentation

mainRouter.use(listRouter);
mainRouter.use(cardRouter);
mainRouter.use(tagRouter);

mainRouter.use(notFoundMiddleware);

function notFoundMiddleware(_, res, next) {
  res.status(404).json({ error: "Resource not found."});
  next(); // Utile si jamais il y a un middleware dans l'index.js après notre mainRouter.
}

module.exports = mainRouter;
