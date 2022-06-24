const router = require('express').Router();
const userRoutes = require('./user-routes');
const gardenRoutes = require('./garden-routes');
const plantRoutes = require('./garden-routes');

router.use('/users', userRoutes);
router.use('/gardens', gardenRoutes);
router.use('/plants', plantRoutes)

module.exports = router;