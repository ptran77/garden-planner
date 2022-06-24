const router = require('express').Router();
const { User, Garden, Plant } = require("../../models");
const withAuth = require('../../utils/auth');

// The '/api/plants' endpoint

// Get all plants
router.get('/', (req, res) => {
  Plant.findAll({
    // Get all the gardens that the plant is in along with their users
    include: {
      model: Garden,
      attributes: ['id', 'garden_name'],
      include: {
        model: User,
        attributes: ['id', 'username']
      }
    }
  })
    .then(dbPlantData => res.json(dbPlantData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

// Get a single plant
router.get('/:id', (req, res) => {
  Plant.findOne({
    where: { id: req.params.id },
    // Get all the gardens that the plant is in along with their users
    include: {
      model: Garden,
      attributes: ['id', 'garden_name'],
      include: {
        model: User,
        attributes: ['id', 'username']
      }
    }
  })
    .then(dbPlantData => {
      if (!dbPlantData) {
        res.status(404).json({ message: 'No plant found with this id' })
        return;
      }

      res.json(dbPlantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

// Add new plant
// withAuth, only logged in user can add new plants
router.post('/', withAuth, (req, res) => {
  /* req.body should look like this
    {
      name: 'Carrot',
      type: 'Vegetable'
      sun_intake: 'partial shade'/'shade'/'full-sun',
      water_intake: 'heavy watering x/day, x/weekly, or drought tolerant',
      soil_type: 'clay/sandy/loamy'
    }
  */
  Plant.create(req.body)
    .then(newPlant => res.json(newPlant))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}) 

module.exports = router;