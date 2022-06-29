const { Garden } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/community', (req, res) => {
  Garden.findAll

  res.render('community');
});

router.get('/community/garden:id', (req, res) => {
  Garden.findOne ({
    where: {
      id: req.params.id
    }
    .then(dbGardenData => {

    })

  })
  res.render('communityGarden');

});

router.get('/zone', (req, res) => {
  res.render('zoneSearch');
})



router.get

module.exports = router;