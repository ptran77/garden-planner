const { Plant } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// main plant page where all plants can be seen
router.get('/', (req, res) => {
    Plant.findAll({
        attributes: [
            'id',
            'name',
            'type',
            'sun_intake',
            'water_intake',
            'soil_type'
        ]
    })
    .then(dbPlantData => {
        // serialize data before handing it to the template
        const plants = dbPlantData.map(plant => plant.get({ plain: true }));
        res.render('plants', {
            plants,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });  
});


// plant info page about a single plant
router.get('/info/:id', (req, res) => {
    Plant.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'type',
            'sun_intake',
            'water_intake',
            'soil_type'
        ]
    })
    .then(dbPlantData => {
        if (!dbPlantData) {
            res.status(400).json({ message: 'No plant matches this id'});
            return;
        }
        // serialize the data
        const plant_info = dbPlantData.get({ plain: true });
        // pass data to template
        res.render('single-plant', {
            plant_info,
            loggedIn: req.session.loggedIn
        });
    })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});

// add plant page where only logged in users can access
router.get('/add-plant', withAuth, (req, res) => {
    res.render('add-plant', {
        loggedIn: req.session.loggedIn
    })
});

module.exports = router;