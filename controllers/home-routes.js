const { Garden } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('login');
});

// USER LOGIN 
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  }
  res.render('login');
});

// USER SIGNUP
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/community', (req, res) => {
  console.log('======Community==Garden===========')
  Garden.findAll ({
    attributes: [
      'id',
      'garden_name',
      'user_id',
      [sequelize.literal('')]
    ]
  })
  .then(dbGardenData => {
    const communityGarden = dbGardenData.map(post => post.get({ plain: true }));
  })

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
});


module.exports = router;