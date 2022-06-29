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

// edit garden page
router.get('/edit/:id', withAuth, (req, res) => {
    Garden.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Plant,
            attributes: ['id','name']
        },
        attributes: ['garden_name']
    })
        .then(dbGardenData => {
            if (!dbGardenData) {
                res.status(404).json({ message: 'No garden found with this id' });
                return;
            }
            const garden = dbGardenData.get({ plain: true });
            res.render('editGarden', { garden, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;