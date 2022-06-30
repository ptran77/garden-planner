const { Plant } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

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
        res.render('plants', { plants });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });  
});


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
        res.render('single-plant', { plant_info });
    })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});

router.get('/add-plant', withAuth, (req, res) => {
    res.render('add-plant')
});

module.exports = router;