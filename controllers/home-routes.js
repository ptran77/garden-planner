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

router.get("/community", (req, res) => {
  console.log('======================');
  Garden.findAll({
    attributes: [
      'id', 'garden_name', 'user_id'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbGardenData => {
      const gardens = dbGardenData.map(garden => garden.get({ plain: true }));

      // Render the community page
      res.render('community', {
        gardens,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/community/garden:id", (req, res) => {
  Garden.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id', 'garden_name', 'user_id'
    ],
    include: [
      {
      model: User,
      attributes: ['username']
      }
    ]
  })
    .then(dbGardenData => {
      if (!dbGardenData) {
        res.status(404).json({ message: 'No gardens found with this id' });
        return;
      }

      const garden = dbGardenData.get({ plain: true });

      // Render single garden page
      res.render('single-garden', {
        garden,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/zone", (req, res) => {
  res.render("zoneSearch");
});

module.exports = router;
