const { Garden, User, Plant } = require('../models');

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
  Garden.findAll ({
    attributes: ['id', 'garden_name', 'created_at'], 
    include: {
      model: User, 
      attributes: ['username'] 
    }
  })
  .then(dbGardenData =>{
    const gardens = dbGardenData.map(garden => garden.get({ plain: true }))
    res.render('community',{
      gardens,
      loggedIn: req.session.loggedIn
    })
  })


});

router.get('/community/garden/:id', (req, res) => {
  Garden.findOne ({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'garden_name'], 
    include:[
      {
        model: User, 
        attributes: ['username'] 
      },
      {
       model: Plant, 
       attributes: ["id", "name", "type"]
      }
    ]  
  })
  .then(dbGardenData =>{
    const garden = dbGardenData.get({ plain: true });
    res.render('one-garden',{
      garden,
      loggedIn: req.session.loggedIn
    })
  })

});

router.get('/zone', (req, res) => {
  res.render('zoneSearch');
});

module.exports = router;