const { Garden, User } = require("../models");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("login");
});

// USER LOGIN
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // take user to login page
  res.render("login");
});

// USER SIGNUP
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/home", (req, res) => {
  res.render("homepage")
});


router.get("/zone", (req, res) => {
  res.render("zoneSearch");
});

module.exports = router;
