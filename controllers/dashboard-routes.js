const router = require('express').Router();
const { Garden, Plant } = require('../models');
const withAuth = require('../utils/auth');

// /dashboard routes

// default dashboard page
router.get('/', withAuth, (req, res) => {
    Garden.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'garden_name', 'created_at']
    })
        .then(dbGardenData => {
            const gardens = dbGardenData.map(garden => garden.get({ plain: true }));
            res.render('dashboard', { gardens, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});



module.exports = router;