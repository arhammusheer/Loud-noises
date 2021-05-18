var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:id", (req, res, next) => {
  res.render("room", {room:req.params.id})
});

router.post("/room", (req, res, next) => {
  res.redirect(`/${req.body.room_name}`)
})

module.exports = router;
