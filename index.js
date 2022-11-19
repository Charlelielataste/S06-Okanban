const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const router = require("./app/routers");
const multer = require('multer');
const app = express();
const bodyParser = multer();

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use( bodyParser.none() );

// Add rate limit policy
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // Limit each IP to 100K requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Decode body
app.use(express.urlencoded({ extended: true })); // On parse les body de type `x-www-form-url-encoded` et on les ajoute au req.body
app.use(express.json()); // Pour parser les body de type JSON (optionnel car pas demandé par la spécification)


app.use(express.static("public"));

// Service /api routes
app.use("/api", cors({ // On autorise les Cross origin requests uniquement pour les routes de l'API.
  origin: "*" // => Techniquement, on devrait ne whitelister UNIQUEMENT le domain de notre front et non pas "tout le moinde" (* => tout le monde)
}), router);

// Start app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
