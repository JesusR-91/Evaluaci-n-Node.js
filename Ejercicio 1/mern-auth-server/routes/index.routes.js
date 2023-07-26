const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("¡Hola Mundo!");
});

module.exports = router;
