const router = require('express').Router();
const { User, Garden, Plant, GardenPlant} = require('../../models');
const withAuth = require('../../utils/auth');

// Get all gardens 
router.get('/', (req, res) => {
  Garden.findAll({
    attributes: ['id', 'garden_name'],
    include: [
      // the user the garden plan created by
      {
        model: User,
        attributes: ['id', 'username']
      },

      // Plants in the garden plan
      {
        model: Plant,
        attributes: ['id', 'name', 'type']
      }
    ]
  })
    .then(dbGardenData => res.json(dbGardenData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Get a single garden 
router.get('/:id', (req, res) => {
  Garden.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'garden_name'],
    include: [
      // the user the garden plan created by
      {
        model: User,
        attributes: ['id', 'username']
      },

      // Plants in the garden plan
      {
        model: Plant,
        attributes: ['id', 'name', 'type']
      }
    ]
  })
    .then(dbGardenData => {
      if (!dbGardenData) {
        res.status(404).json({ message: 'No garden found with this id' });
        return;
      }
      res.json(dbGardenData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Creates a new garden plan
// withAuth is use, so that only logged-in users can create new garden plans
router.post('/', withAuth, (req, res) => {
  /* req.body should look like this
    {
      garden_name: 'Awesome garden',
      plantIds: [1, 2, 3]
    }
  */
  Garden.create({
    garden_name: req.body.garden_name,
    user_id: req.session.user_id
  })
    .then((garden) => {
      // If there are plants, we need to create pairings to bulk create in the GardenPlant model
      if (req.body.plantIds.length) {
        const gardenPlantIdArr = req.body.plantIds.map((plant_id) => {
          return {
            garden_id: garden.id,
            plant_id
          };
        });
        return GardenPlant.bulkCreate(gardenPlantIdArr);
      }
      // if no plants, just respond
      res.status(200).json(garden);
    })
    .then((gardenPlantIds) => res.status(200).json(gardenPlantIds))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

// Update garden plan
// withAuth is use, so that only logged-in users can update garden plans
router.put('/:id', withAuth, (req, res) => {
  /* req.body should look like this
    {
      garden_name: 'Awesome garden',
      plantIds: [1, 2, 3, ...],
    }
  */
  Garden.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((garden) => {
      // find all associated plants from GardenPlant
      return GardenPlant.findAll({ where: { garden_id: req.params.id } });
    })
    .then((gardenPlants) => {
      // get list of current plant_ids
      const gardenPlantIds = gardenPlants.map(({ plant_id }) => plant_id);
      // create filtered list of new plant_ids
      const newGardenPlants = req.body.plantIds
        .filter((plant_id) => !gardenPlantIds.includes(plant_id))
        .map((plant_id) => {
          return {
            garden_id: req.params.id,
            plant_id
          };
        });
      // find out which gardenPlants to remove
      const gardenPlantsToRemove = gardenPlants
        .filter(({ plant_id }) => !req.body.plantIds.includes(plant_id))
        .map(({ id }) => id);
      
      // destroy the to be remove ones and add the new ones
      return Promise.all([
        GardenPlant.destroy({ where: { id: gardenPlantsToRemove } }),
        GardenPlant.bulkCreate(newGardenPlants)
      ]);
    })
    .then((updatedGardenPlants) => res.json(updatedGardenPlants))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

// Destroy Garden Plan
// withAuth is use, so that only logged-in users can delete garden plans
router.delete('/:id', withAuth, (req, res) => {
  Garden.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbGardenData => {
      if (!dbGardenData) {
        res.status(404).json({ message: 'No garden found with this id' });
        return;
      }
      res.json(dbGardenData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;