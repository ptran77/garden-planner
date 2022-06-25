const { GardenPlant } = require('../models');

const gardenplantdata = [
  {
    garden_id: 1,
    plant_id: 1
  },
  {
    garden_id: 1,
    plant_id: 2
  },
  {
    garden_id: 1,
    plant_id: 3
  },
  {
    garden_id: 2,
    plant_id: 1
  },
  {
    garden_id: 2,
    plant_id: 4
  },
  {
    garden_id: 2,
    plant_id: 5
  },
  {
    garden_id: 3,
    plant_id: 5
  },
  {
    garden_id: 3,
    plant_id: 2
  },
  {
    garden_id: 4,
    plant_id: 3
  },
  {
    garden_id: 5,
    plant_id: 5
  },
  {
    garden_id: 6,
    plant_id: 1
  },
  {
    garden_id: 6,
    plant_id: 3
  },
  {
    garden_id: 7,
    plant_id: 2
  }
];

const seedGardenPlants = () => GardenPlant.bulkCreate(gardenplantdata, {individualHooks: true});

module.exports = seedGardenPlants;