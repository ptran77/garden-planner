const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/community', (req, res) => {
  res.render('homepage');
});

router.get

module.exports = router;