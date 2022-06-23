const { Router } = require('express');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);