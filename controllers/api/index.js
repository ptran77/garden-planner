const router = require('express').Router();
<<<<<<< HEAD
const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);
=======
const userRoutes = require('./user-routes');
const gardenRoutes = require('./garden-routes');
const plantRoutes = require('./plant-routes');

router.use('/users', userRoutes);
router.use('/gardens', gardenRoutes);
router.use('/plants', plantRoutes)
>>>>>>> 971aad30ef77d11d827a3a962ba171d02f5ded99

module.exports = router;