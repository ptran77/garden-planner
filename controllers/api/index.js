const router = require('express').Router();
const userRoutes = require('./user-routes');
const gardenRoutes = require('./garden-routes')

router.use('/users', userRoutes);
router.use('/gardens', gardenRoutes);

module.exports = router;